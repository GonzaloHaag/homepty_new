"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { OfferSchema } from "@/schemas";
import { Offer } from "@/types";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createOfferAction({ offer }: { offer: unknown }) {
  const validatedFields = OfferSchema.safeParse(offer);
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase.from("ofertas").insert({
    action: validatedFields.data.action,
    min_price: validatedFields.data.min_price,
    max_price: validatedFields.data.max_price,
    ubicaciones: validatedFields.data.ubicaciones,
    contacto: validatedFields.data.contacto,
    nivel_urgencia: validatedFields.data.nivel_urgencia,
    notas_adicionales: validatedFields.data.notas_adicionales,
    tipo_propiedad: validatedFields.data.tipo_propiedad,
    status: validatedFields.data.status,
    user_id: userId,
  });

  if (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al crear la oferta. Por favor, intenta de nuevo.",
    };
  }
  revalidatePath("/crm/offers");
  return {
    ok: true,
    message: "Oferta creada exitosamente.",
  };
}

export async function editOfferAction({
  offerId,
  offer,
}: {
  offerId: Offer["id"];
  offer: unknown;
}) {
  const validatedFields = OfferSchema.safeParse(offer);
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase
    .from("ofertas")
    .update({
      action: validatedFields.data.action,
      min_price: validatedFields.data.min_price,
      max_price: validatedFields.data.max_price,
      ubicaciones: validatedFields.data.ubicaciones,
      contacto: validatedFields.data.contacto,
      nivel_urgencia: validatedFields.data.nivel_urgencia,
      notas_adicionales: validatedFields.data.notas_adicionales,
      tipo_propiedad: validatedFields.data.tipo_propiedad,
      status: validatedFields.data.status,
    })
    .eq("id", offerId)
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar la oferta. Por favor, intenta de nuevo.",
    };
  }
  revalidatePath("/crm/offers");
  return {
    ok: true,
    message: "Oferta actualizada exitosamente.",
  };
}


export async function deleteOfferAction({ offerId }: { offerId: Offer["id"] }) {
  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase
    .from("ofertas")
    .delete()
    .eq("id", offerId)
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al eliminar la oferta. Por favor, intenta de nuevo.",
    };
  }
  revalidatePath("/crm/offers");
  return {
    ok: true,
    message: "Oferta eliminada exitosamente.",
  };
}