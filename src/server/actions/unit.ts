"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import { PropertyUnitSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";

export async function createPropertyUnitAction({
  unit,
  unitFiles,
}: {
  unit: unknown;
  unitFiles: File[];
}) {
  const { userId } = await verifySession();
  const supabase = await createClient();
  // Paso 1 -- Subir imagenes de la unidad al storage
  const uploadUnitImages = await Promise.all(
    unitFiles.map(async (file) => {
      const { error, imageUrl } = await uploadImage({
        file,
        bucket: "units_images",
      });
      if (error) {
        throw new Error("Error al subir las imagenes de la unidad" + error);
      }
      return imageUrl;
    })
  );
  // Paso 2 -- Subir unidad
  const validatedFields = PropertyUnitSchema.safeParse(unit);
  if (!validatedFields.success) {
    console.log("Error de validación:", validatedFields.error);
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
  const { data: unidad, error: errorUnidad } = await supabase
    .from("unidades")
    .insert({
      ...validatedFields.data,
      id_usuario: userId,
      id_desarrollo: null,
    })
    .select()
    .single();
  if (errorUnidad) {
    return {
      ok: false,
      message: errorUnidad.message,
    };
  }

  // Paso 3 - Relacionar unidad e imagenes de la misma

  const { error } = await supabase.from("imagenes_unidades").insert(
    uploadUnitImages.map((uploadImage) => ({
      id_unidad: unidad.id,
      image_url: uploadImage,
    }))
  );

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
  revalidatePath("/");
  revalidateTag("properties", "max");
  return {
    ok: true,
    message: "Unidad creada con éxito",
  };
}
