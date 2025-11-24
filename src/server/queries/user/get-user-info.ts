"use server";
import { createClient } from "@/lib/supabase/server";
import { ServiceResponse, User } from "@/types";

export async function getUserInfo(): Promise<ServiceResponse<User>> {
  const supabase = await createClient();
  const {
    data: { user: userAuth },
    error: errorUserAuth,
  } = await supabase.auth.getUser();
  if (errorUserAuth || !userAuth) {
    return {
      ok: false,
      message: "Error al obtener el usuario actual.",
      data: null,
    };
  }
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", userAuth.id)
    .single();

  if (error || !data) {
    console.log("Error profile user: ", error);
    return {
      ok: false,
      message: "Error al obtener el perfil del usuario.",
      data: null,
    };
  }

  return {
    ok: true,
    message: "Usuario actual obtenido correctamente.",
    data: data,
  };
}
