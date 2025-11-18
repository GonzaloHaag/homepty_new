"use server";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/schemas";
import { FormState } from "@/types/form-state";
import { redirect } from "next/navigation";

export async function loginAction(state: FormState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  /** Server action: no usamos la api. Las api serviran para 
   * exponer endpoints a terceros.
   */

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if(error) {
    console.error("Error login in action:", error);
    if(error.code === "invalid_credentials") {
      return {
        ok:false,
        message: "Credenciales inválidas"
      };
    }
    return {
      ok:false,
      message: "Hubo un error al iniciar sesión. Por favor, intenta de nuevo.",
    };
  }

  redirect("/");
}
