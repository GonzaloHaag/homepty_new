import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { brainValuacion } from "@/lib/brain-client";
import { trackActivity } from "@/server/actions/activity-tracker";
import type { ValuewebEstimateInput } from "@/lib/brain-types";

/**
 * POST /api/valueweb/estimate
 * Server-side proxy to Brain valueweb.estimate (tRPC apiKeyProcedure).
 * Keeps HOMEPTY_BRAIN_API_KEY server-side.
 *
 * Body: ValuewebEstimateInput (lat, lon, direccion, etc.)
 * Returns: ValuewebEstimateResult
 */
export async function POST(req: NextRequest) {
    try {
        const { userId } = await verifySession();
        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = (await req.json()) as ValuewebEstimateInput;

        // Validate required fields
        if (!body.lat || !body.lon || !body.direccion) {
            return NextResponse.json(
                { error: "lat, lon y direccion son requeridos" },
                { status: 400 }
            );
        }

        // Call Brain valueweb API
        const result = await brainValuacion.estimate(body);

        // Track the estimation activity (fire-and-forget)
        trackActivity({
            tipo_actividad: "estimacion_valor",
            modulo: "dashboard",
            entidad_tipo: "valuacion",
            metadata: {
                direccion: body.direccion,
                tipo_inmueble: body.tipo_inmueble,
                valor_promedio: result.valor_promedio,
                total_comparables: result.inmuebles?.length ?? 0,
            },
        }).catch(() => { });

        return NextResponse.json(result);
    } catch (error) {
        console.error("[Valueweb] Estimation error:", error);

        const message =
            error instanceof Error ? error.message : "Error desconocido";

        return NextResponse.json(
            {
                error: "Error al estimar el valor",
                message,
                valor_promedio: null,
                valor_promedio_m2: null,
                inmuebles: [],
            },
            { status: 500 }
        );
    }
}
