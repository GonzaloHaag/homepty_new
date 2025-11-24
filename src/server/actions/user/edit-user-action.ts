"use server";
import { createClient } from "@/lib/supabase/server";
import { UserSchema } from "@/schemas";
import { FormState, User } from "@/types";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function editUserAction(
  userId: string,
  state: FormState<User>,
  formData: FormData
) {
  const rawData = {
    nombre_usuario: formData.get("nombre_usuario") as string,
    telefono_usuario: formData.get("telefono_usuario") as string,
    email_usuario: formData.get("email_usuario") as string,
    actividad_usuario: formData.get("actividad_usuario") as string,
    id_estado: formData.get("id_estado") ? Number(formData.get("id_estado")) : null,
    id_ciudad: formData.get("id_ciudad") ? Number(formData.get("id_ciudad")) : null,
    descripcion_usuario: formData.get("descripcion_usuario") as string,
  };
  const validatedFields = UserSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      ok: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Error de validación. Por favor, revisa los campos.",
      inputs: rawData
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("usuarios")
    .update({
      nombre_usuario: validatedFields.data.nombre_usuario,
      telefono_usuario: validatedFields.data.telefono_usuario,
      email_usuario: validatedFields.data.email_usuario,
      actividad_usuario: validatedFields.data.actividad_usuario,
      id_estado: validatedFields.data.id_estado,
      id_ciudad: validatedFields.data.id_ciudad,
      descripcion_usuario: validatedFields.data.descripcion_usuario,
    })
    .eq("id", userId);

  if (error) {
    console.log("Error updating user:", error);
    return {
      ok: false,
      message: "Error al actualizar el perfil. Por favor, intenta de nuevo.",
      inputs: validatedFields.data
    };
  }
  revalidatePath("/perfil");
  return {
    ok: true,
    message: "Perfil actualizado correctamente.",
  };
}
