"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import {
  Development,
  DevelopmentType,
  DevelopmentWithImages,
  QueryResponse,
} from "@/types";

const VALID_DEVELOPMENT_TYPES: DevelopmentType[] = [
  "Preventa",
  "Edificio",
  "Plaza Comercial",
  "Lote",
];

export async function getAllDevelopments({
  search = "",
  type_operation = "",
  type_property = "",
}: {
  search?: string;
  type_operation?: string;
  type_property?: string;
} = {}): Promise<QueryResponse<DevelopmentWithImages[]>> {
  const supabase = await createClient();
  let queryBuilder = supabase
    .from("desarrollos")
    .select("*, imagenes_desarrollos(*)")
    .order("created_at", { ascending: false });

  if (search !== "") {
    queryBuilder = queryBuilder.ilike("nombre", `%${search}%`);
  }
  if (type_operation !== "") {
    queryBuilder = queryBuilder.eq("id_tipo_accion", Number(type_operation));
  }
  // Solo aplicar filtro de tipo si es válido para desarrollos
  if (
    type_property !== "" &&
    VALID_DEVELOPMENT_TYPES.includes(type_property as DevelopmentType)
  ) {
    queryBuilder = queryBuilder.eq("tipo", type_property as DevelopmentType);
  }

  const { error, data } = await queryBuilder;

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
