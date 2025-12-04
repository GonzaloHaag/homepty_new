"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PropertyApplicationSchema } from "@/schemas";
import { FormState, PropertyApplication } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createPropertyApplicationAction(
  state: FormState<PropertyApplication>,
  formData: FormData
) {
  const entries = Object.fromEntries(formData.entries());

  const validatedFields = PropertyApplicationSchema.safeParse(entries);

  if (!validatedFields.success) {
    return {
      ok: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Error de validación. Por favor, revisa los campos.",
      inputs: entries,
    };
  }

  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase.from("solicitudes_inmuebles").insert({
    usuario_id: userId,
    tipo_operacion: validatedFields.data.tipo_operacion,
    tipo_propiedad: validatedFields.data.tipo_propiedad,
    presupuesto_min: validatedFields.data.presupuesto_min,
    presupuesto_max: validatedFields.data.presupuesto_max,
    id_ciudad: validatedFields.data.id_ciudad,
    zona: validatedFields.data.zona,
    habitaciones: validatedFields.data.habitaciones,
    banos: validatedFields.data.banos,
    estacionamientos: validatedFields.data.estacionamientos,
    metros_cuadrados: validatedFields.data.metros_cuadrados,
    detalles_adicionales: validatedFields.data.detalles_adicionales,
    nombre_contacto: validatedFields.data.nombre_contacto,
    correo_contacto: validatedFields.data.correo_contacto,
    telefono_contacto: validatedFields.data.telefono_contacto,
    estado_solicitud: "nueva", // Estado por defecto
  });

  if (error) {
    console.error("Error creating property application:", error);
    return {
      ok: false,
      message: "Error al crear la solicitud. Por favor, intenta de nuevo.",
      inputs: entries,
    };
  }

  revalidatePath("/solicitudes-inmuebles");
  redirect("/solicitudes-inmuebles");
}
