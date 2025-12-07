"use server";
import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/schemas";
import { LoginSchemaType } from "@/schemas/login-schema";
import { FormState } from "@/types";
import { redirect } from "next/navigation";
import z from "zod";

export async function loginUserAction(state: FormState<LoginSchemaType>, formData: FormData):Promise<FormState<LoginSchemaType>> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ok: false,
      message: "Error de validación",
      errors: z.flattenError(validatedFields.error).fieldErrors
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
        message: "Credenciales inválidas",
        inputs: {
          email: validatedFields.data.email,
          password: validatedFields.data.password,
        }
      };
    }
    return {
      ok:false,
      message: "Hubo un error al iniciar sesión. Por favor, intenta de nuevo.",
    };
  }

  redirect("/");
}
