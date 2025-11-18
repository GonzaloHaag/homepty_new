import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const userId = request.headers.get("user-id");
  if (!userId) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Usuario no autorizado",
        data: null,
      }),
      { status: 401 }
    );
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("solicitudes_inmuebles")
      .select("*")
      .eq("usuario_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return new Response(
      JSON.stringify({
        ok: true,
        message: "Solicitudes obtenidas correctamente",
        data: data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error al obtener solicitudes:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Error al obtener solicitudes",
        data: null,
      }),
      { status: 500 }
    );
  }
}
