import { createClient } from "@/lib/supabase/server";
import { QueryResponse, UnitWithImages } from "@/types";
import { verifySession } from "@/lib/auth";

export async function getAllUnits(): Promise<QueryResponse<UnitWithImages[]>> {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("unidades")
    .select("*, imagenes_unidades(*)")
    .is("id_desarrollo", null)
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

export async function getAvailableUnitsForDevelopment(): Promise<
  QueryResponse<UnitWithImages[]>
> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("unidades")
    .select("*, imagenes_unidades(*)")
    .is("id_desarrollo", null)
    .eq("id_usuario", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error al obtener las unidades disponibles:", error);
    return {
      ok: false,
      message: "Error al obtener las unidades. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Unidades disponibles obtenidas con éxito",
    data,
  };
}

export async function getUnitsByCurrentUser(): Promise<
  QueryResponse<UnitWithImages[]>
> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("unidades")
    .select("*, imagenes_unidades(*)")
    .eq("id_usuario", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error al obtener las unidades del usuario:", error);
    return {
      ok: false,
      message: "Error al obtener las unidades. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Unidades del usuario obtenidas con éxito",
    data,
  };
}

export async function getUnitById({
  id,
}: {
  id: UnitWithImages["id"];
}): Promise<QueryResponse<UnitWithImages>> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("unidades")
    .select("*, imagenes_unidades(*)")
    .eq("id", id)
    .eq("id_usuario", userId)
    .single();

  if (error) {
    console.log("Error al obtener la unidad por ID:", error);
    return {
      ok: false,
      message: "Error al obtener la unidad. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Unidad obtenida con éxito",
    data,
  };
}
