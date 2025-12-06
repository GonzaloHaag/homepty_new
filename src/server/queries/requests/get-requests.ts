import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { QueryResponse, Request } from "@/types";

export async function getRequests(): Promise<QueryResponse<Request[]>> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("usuario_id", userId)
    .order("created_at", { ascending: false });

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
