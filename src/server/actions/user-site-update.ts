"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generateApiKey } from "@/lib/crypto/generate-api-key";

/**
 * Actualiza la configuración del tema del sitio del usuario
 */
export async function updateSiteTheme(themeConfig: {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logo?: string | null;
  banner?: string | null;
}) {
  const supabase = await createClient();

  try {
    // Obtener el usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "No autenticado",
      };
    }

    // Actualizar el theme_config del sitio del usuario
    const { data, error } = await supabase
      .from("user_sites")
      .update({
        theme_config: themeConfig,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating theme:", error);
      return {
        success: false,
        error: "Error al actualizar el tema",
      };
    }

    // Revalidar la página para mostrar los cambios
    revalidatePath("/my-site");

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error updating theme:", error);
    return {
      success: false,
      error: "Error inesperado al actualizar el tema",
    };
  }
}

/**
 * Actualiza la configuración SEO del sitio del usuario
 */
export async function updateSiteSEO(seoConfig: {
  title?: string | null;
  description?: string | null;
  keywords?: string[];
}) {
  const supabase = await createClient();

  try {
    // Obtener el usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "No autenticado",
      };
    }

    // Actualizar el seo_config del sitio del usuario
    const { data, error } = await supabase
      .from("user_sites")
      .update({
        seo_config: seoConfig,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating SEO:", error);
      return {
        success: false,
        error: "Error al actualizar la configuración SEO",
      };
    }

    // Revalidar la página para mostrar los cambios
    revalidatePath("/my-site");

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error updating SEO:", error);
    return {
      success: false,
      error: "Error inesperado al actualizar la configuración SEO",
    };
  }
}

/**
 * Regenera la API Key del sitio del usuario
 * IMPORTANTE: Esta acción invalidará la API Key anterior inmediatamente
 */
export async function regenerateApiKey() {
  const supabase = await createClient();

  try {
    // Obtener el usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "No autenticado",
      };
    }

    // Generar nueva API Key
    const newApiKey = generateApiKey();

    // Actualizar la API Key en la base de datos
    const { data, error } = await supabase
      .from("user_sites")
      .update({
        cbf_api_key: newApiKey,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error regenerating API key:", error);
      return {
        success: false,
        error: "Error al regenerar la API Key",
      };
    }

    // Revalidar la página para mostrar los cambios
    revalidatePath("/my-site");

    return {
      success: true,
      data: {
        newApiKey,
      },
    };
  } catch (error) {
    console.error("Error regenerating API key:", error);
    return {
      success: false,
      error: "Error inesperado al regenerar la API Key",
    };
  }
}

/**
 * Actualiza el dominio personalizado del sitio
 */
export async function updateCustomDomain(customDomain: string) {
  const supabase = await createClient();

  try {
    // Obtener el usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "No autenticado",
      };
    }

    // Validar formato del dominio
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(customDomain)) {
      return {
        success: false,
        error: "Formato de dominio inválido",
      };
    }

    // Actualizar el dominio personalizado
    const { data, error } = await supabase
      .from("user_sites")
      .update({
        custom_domain: customDomain,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating custom domain:", error);
      return {
        success: false,
        error: "Error al actualizar el dominio personalizado",
      };
    }

    // Revalidar la página para mostrar los cambios
    revalidatePath("/my-site");

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error updating custom domain:", error);
    return {
      success: false,
      error: "Error inesperado al actualizar el dominio",
    };
  }
}

/**
 * Activa o desactiva el sitio del usuario
 */
export async function toggleSiteStatus(isActive: boolean) {
  const supabase = await createClient();

  try {
    // Obtener el usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "No autenticado",
      };
    }

    // Actualizar el estado del sitio
    const { data, error } = await supabase
      .from("user_sites")
      .update({
        is_active: isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error toggling site status:", error);
      return {
        success: false,
        error: "Error al cambiar el estado del sitio",
      };
    }

    // Revalidar la página para mostrar los cambios
    revalidatePath("/my-site");

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error toggling site status:", error);
    return {
      success: false,
      error: "Error inesperado al cambiar el estado del sitio",
    };
  }
}
