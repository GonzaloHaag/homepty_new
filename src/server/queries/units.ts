import { createClient } from "@/lib/supabase/server";
import { QueryResponse, Unit } from "@/types";

export async function getAllUnits(): Promise<QueryResponse<Unit[]>> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("unidades")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error al obtener las unidades:", error);
    return {
      ok: false,
      message: "Error al obtener las unidades. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Unidades obtenidas con éxito",
    data,
  };
}
