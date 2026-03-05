"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ──────────────────────────────────────────────
// TIPOS LOCALES
// ──────────────────────────────────────────────
export type EasyBrokerIntegration = {
    id: string;
    id_usuario: string;
    api_key: string;
    is_active: boolean;
    last_sync_at: string | null;
    last_sync_status: "success" | "error" | "pending";
    properties_synced_count: number;
    error_message: string | null;
    created_at: string;
    updated_at: string;
};

export type EasyBrokerSyncLog = {
    id: string;
    integration_id: string;
    sync_started_at: string;
    sync_completed_at: string | null;
    status: "running" | "success" | "error";
    properties_added: number;
    properties_updated: number;
    properties_failed: number;
    error_details: Record<string, unknown> | null;
    created_at: string;
};

export type ActionResponse<T = void> =
    | { ok: true; message: string; data?: T }
    | { ok: false; message: string };

// ──────────────────────────────────────────────
// 1. GUARDAR / ACTUALIZAR TOKEN
// ──────────────────────────────────────────────
export async function saveEasyBrokerTokenAction({
    apiKey,
}: {
    apiKey: string;
}): Promise<ActionResponse> {
    const { userId } = await verifySession();
    const supabase = await createClient();

    const { error } = await supabase.from("easybroker_integrations").upsert(
        {
            id_usuario: userId,
            api_key: apiKey.trim(),
            is_active: true,
            updated_at: new Date().toISOString(),
        },
        { onConflict: "id_usuario" }
    );

    if (error) {
        console.error("[EasyBroker] Error guardando token:", error);
        return { ok: false, message: "Error al guardar el token: " + error.message };
    }

    revalidatePath("/settings/integrations/easybroker");
    return { ok: true, message: "Token guardado correctamente." };
}

// ──────────────────────────────────────────────
// 2. PROBAR CONEXIÓN (valida el token con EB)
// ──────────────────────────────────────────────
export async function testEasyBrokerConnectionAction(): Promise<
    ActionResponse<{ company_name?: string; properties_count?: number }>
> {
    const { userId } = await verifySession();
    const supabase = await createClient();

    const { data: integration, error: fetchError } = await supabase
        .from("easybroker_integrations")
        .select("api_key")
        .eq("id_usuario", userId)
        .maybeSingle();

    if (fetchError || !integration) {
        return { ok: false, message: "No hay integración configurada." };
    }

    try {
        const response = await fetch(
            "https://api.easybroker.com/v1/properties?limit=1",
            {
                headers: {
                    "X-Authorization": integration.api_key,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return {
                ok: false,
                message:
                    response.status === 401
                        ? "Token inválido. Verifica tu API Key de EasyBroker."
                        : `Error de EasyBroker: ${response.statusText}`,
            };
        }

        const json = await response.json();
        return {
            ok: true,
            message: "Conexión exitosa con EasyBroker.",
            data: { properties_count: json.pagination?.total ?? 0 },
        };
    } catch {
        return {
            ok: false,
            message: "No se pudo conectar con EasyBroker. Verifica tu conexión.",
        };
    }
}

// ──────────────────────────────────────────────
// 3. DISPARAR SINCRONIZACIÓN MANUAL
// ──────────────────────────────────────────────
export async function triggerSyncAction(): Promise<ActionResponse> {
    const { userId } = await verifySession();
    const supabase = await createClient();

    // Verificar que existe integración activa
    const { data: integration } = await supabase
        .from("easybroker_integrations")
        .select("id, is_active")
        .eq("id_usuario", userId)
        .maybeSingle();

    if (!integration) {
        return { ok: false, message: "No hay integración configurada." };
    }
    if (!integration.is_active) {
        return { ok: false, message: "La integración está desactivada." };
    }

    // Llamar al API route de sincronización
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    try {
        const response = await fetch(`${baseUrl}/api/easybroker/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Pasamos el userId para autenticar server-side
            body: JSON.stringify({ userId }),
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, message: result.message ?? "Error al sincronizar." };
        }

        revalidatePath("/settings/integrations/easybroker");
        return {
            ok: true,
            message: `Sincronización completada: ${result.added} nuevas, ${result.updated} actualizadas.`,
        };
    } catch {
        return { ok: false, message: "Error al iniciar la sincronización." };
    }
}

// ──────────────────────────────────────────────
// 4. OBTENER ESTADO DE LA INTEGRACIÓN
// ──────────────────────────────────────────────
export async function getIntegrationStatusAction(): Promise<
    ActionResponse<EasyBrokerIntegration | null>
> {
    const { userId } = await verifySession();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("easybroker_integrations")
        .select("*")
        .eq("id_usuario", userId)
        .maybeSingle();

    if (error) {
        return { ok: false, message: "Error al obtener estado: " + error.message };
    }

    return {
        ok: true,
        message: "Estado obtenido.",
        data: data as EasyBrokerIntegration | null,
    };
}

// ──────────────────────────────────────────────
// 5. HISTORIAL DE SINCRONIZACIONES
// ──────────────────────────────────────────────
export async function getSyncHistoryAction(): Promise<
    ActionResponse<EasyBrokerSyncLog[]>
> {
    const { userId } = await verifySession();
    const supabase = await createClient();

    // Obtener el integration_id del usuario
    const { data: integration } = await supabase
        .from("easybroker_integrations")
        .select("id")
        .eq("id_usuario", userId)
        .maybeSingle();

    if (!integration) {
        return { ok: true, message: "Sin historial.", data: [] };
    }

    const { data, error } = await supabase
        .from("easybroker_sync_logs")
        .select("*")
        .eq("integration_id", integration.id)
        .order("created_at", { ascending: false })
        .limit(10);

    if (error) {
        return { ok: false, message: "Error al obtener historial: " + error.message };
    }

    return {
        ok: true,
        message: "Historial obtenido.",
        data: (data ?? []) as EasyBrokerSyncLog[],
    };
}

// ──────────────────────────────────────────────
// 6. ACTIVAR / DESACTIVAR INTEGRACIÓN
// ──────────────────────────────────────────────
export async function toggleIntegrationAction({
    isActive,
}: {
    isActive: boolean;
}): Promise<ActionResponse> {
    const { userId } = await verifySession();
    const supabase = await createClient();

    const { error } = await supabase
        .from("easybroker_integrations")
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq("id_usuario", userId);

    if (error) {
        return { ok: false, message: "Error al actualizar: " + error.message };
    }

    revalidatePath("/settings/integrations/easybroker");
    return {
        ok: true,
        message: isActive ? "Integración activada." : "Integración desactivada.",
    };
}
