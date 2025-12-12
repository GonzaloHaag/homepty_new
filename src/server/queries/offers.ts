import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Offer, QueryResponse } from "@/types";

export async function getOffersByCurrentUser(): Promise<
  QueryResponse<Offer[]>
> {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ofertas")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al obtener las ofertas:", error);
    return {
      ok: false,
      message: "Error al obtener las ofertas. Por favor, intenta de nuevo.",
    };
  }

  return {
    ok: true,
    message: "Ofertas obtenidas exitosamente.",
    data,
  };
}
