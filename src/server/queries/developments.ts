"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Development, DevelopmentWithImages, QueryResponse } from "@/types";

export async function getAllDevelopments(): Promise<
  QueryResponse<DevelopmentWithImages[]>
> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("desarrollos")
    .select("*, imagenes_desarrollos(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error al obtener los desarrollos:", error);
    return {
      ok: false,
      message: "Error al obtener los desarrollos. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Desarrollos obtenidos con éxito",
    data,
  };
}

export async function getDevelopmentsByCurrentUser(): Promise<
  QueryResponse<DevelopmentWithImages[]>
> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("desarrollos")
    .select("*, imagenes_desarrollos(*)")
    .eq("id_usuario", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error al obtener los desarrollos del usuario:", error);
    return {
      ok: false,
      message: "Error al obtener los desarrollos. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Desarrollos del usuario obtenidos con éxito",
    data,
  };
}

export async function getDevelopmentById({
  id,
}: {
  id: Development["id"];
}): Promise<QueryResponse<DevelopmentWithImages>> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("desarrollos")
    .select("*, imagenes_desarrollos(*)")
    .eq("id", id)
    .eq("id_usuario", userId)
    .single();

  if (error) {
    console.log("Error al obtener el desarrollo por ID:", error);
    return {
      ok: false,
      message: "Error al obtener el desarrollo. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Desarrollo obtenido con éxito",
    data,
  };
}
