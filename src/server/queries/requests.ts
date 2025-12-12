import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { QueryResponse, Request, RequestStatus } from "@/types";

export async function getRequests({
  status,
  tipo_propiedad_id,
}: {
  status: string;
  tipo_propiedad_id: string;
}): Promise<QueryResponse<Request[]>> {
  const { userId } = await verifySession();
  const supabase = await createClient();

  let queryBuilder = supabase
    .from("solicitudes")
    .select("*")
    .eq("usuario_id", userId)
    .order("created_at", { ascending: false });

  if (status !== "") {
    queryBuilder = queryBuilder.eq("estado_solicitud", status as RequestStatus);
  }

  if (tipo_propiedad_id !== "") {
    queryBuilder = queryBuilder.eq(
      "tipo_propiedad_id",
      Number(tipo_propiedad_id)
    );
  }
  const { data, error } = await queryBuilder;

  if (error) {
    console.error("Error al obtener las solicitudes:", error);
    return {
      ok: false,
      message: "Error al obtener las solicitudes. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Solicitudes obtenidas exitosamente.",
    data,
  };
}

export async function getRequestById({
  id,
}: {
  id: number;
}): Promise<QueryResponse<Request>> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("usuario_id", userId)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener la solicitud:", error);
    return {
      ok: false,
      message: "Error al obtener la solicitud. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Solicitud obtenida exitosamente.",
    data,
  };
}
