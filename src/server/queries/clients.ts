import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Client, QueryResponse } from "@/types";

export async function getClientsByCurrentUser(): Promise<
  QueryResponse<Client[]>
> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("clientes")
    .select("*")
    .eq("id_usuario", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error al obtener los clientes:", error);
    return {
      ok: false,
      message: "Error al obtener los clientes. Por favor, intenta de nuevo.",
    };
  }
  return { ok: true, message: "Clientes obtenidos con éxito", data };
}
