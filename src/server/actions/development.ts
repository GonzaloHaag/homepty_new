"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import { PropertyDevelopmentSchema } from "@/schemas/property-development-schema";
import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";

export async function createPropertyDevelopmentAction({
  development,
  developmentFiles,
  unitIds = [],
}: {
  development: unknown;
  developmentFiles: File[];
  unitIds?: number[];
}) {
  const { userId } = await verifySession();
  const supabase = await createClient();

  // Paso 1 -- Subir imagenes del desarrollo al storage
  const uploadDevelopmentImages = await Promise.all(
    developmentFiles.map(async (file) => {
      const { error, imageUrl } = await uploadImage({
        file,
        bucket: "developments_images",
      });
      if (error) {
        throw new Error("Error al subir las imagenes del desarrollo: " + error);
      }
      return imageUrl;
    })
  );

  // Paso 2 -- Subir desarrollo
  const validatedFields = PropertyDevelopmentSchema.safeParse(development);
  if (!validatedFields.success) {
    console.log("Error de validación:", validatedFields.error);
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { data: desarrolloData, error: errorDesarrollo } = await supabase
    .from("desarrollos")
    .insert({
      tipo: validatedFields.data.tipo,
      nombre: validatedFields.data.nombre,
      id_tipo_accion: validatedFields.data.id_tipo_accion,
      id_tipo_uso: validatedFields.data.id_tipo_uso,
      descripcion: validatedFields.data.descripcion,
      descripcion_estado: validatedFields.data.descripcion_estado,
      descripcion_inversion: validatedFields.data.descripcion_inversion,
      area: validatedFields.data.area,
      area_construida: validatedFields.data.area_construida,
      precio: validatedFields.data.precio,
      habitaciones: validatedFields.data.habitaciones,
      banios: validatedFields.data.banios,
      estacionamientos: validatedFields.data.estacionamientos,
      caracteristicas: validatedFields.data.caracteristicas,
      id_estado: validatedFields.data.id_estado,
      id_ciudad: validatedFields.data.id_ciudad,
      codigo_postal: validatedFields.data.codigo_postal,
      direccion: validatedFields.data.direccion,
      colonia: validatedFields.data.colonia,
      id_usuario: userId,
    })
    .select()
    .single();

  if (errorDesarrollo) {
    return {
      ok: false,
      message: errorDesarrollo.message,
    };
  }

  // Paso 3 - Relacionar desarrollo e imagenes del mismo
  const { error } = await supabase.from("imagenes_desarrollos").insert(
    uploadDevelopmentImages.map((uploadImage) => ({
      id_desarrollo: desarrolloData.id,
      image_url: uploadImage,
    }))
  );

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  // Paso 4 - Asignar unidades seleccionadas al desarrollo
  if (unitIds.length > 0) {
    const { error: unitsError } = await supabase
      .from("unidades")
      .update({ id_desarrollo: desarrolloData.id })
      .in("id", unitIds);

    if (unitsError) {
      return {
        ok: false,
        message: "Error al asignar las unidades al desarrollo: " + unitsError.message,
      };
    }
  }

  revalidatePath("/");
  revalidateTag("properties", "max");
  
  return {
    ok: true,
    message: "Desarrollo creado con éxito",
    developmentId: desarrolloData.id,
  };
}
