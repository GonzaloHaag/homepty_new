"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";
import { PropertySchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import { trackActivity } from "./activity-tracker";
import z from "zod";
import type { Database } from "@/types/database";

export async function createUnitAction({
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
        bucket: "properties_images",
      });
      if (error) {
        throw new Error("Error al subir las imagenes de la unidad" + error);
      }
      return imageUrl;
    })
  );
  // Paso 2 -- Subir unidad
  const validatedFields = PropertySchema.safeParse(unit);
  if (!validatedFields.success) {
    console.log("Error de validación:", validatedFields.error);
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { amenidades, ...unitData } = validatedFields.data;
  const { data: unidad, error: errorUnidad } = await supabase
    .from("propiedades")
    .insert({
      ...unitData,
      id_usuario: userId,
      is_unit: true,
      parent_id: null,
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

  const { error } = await supabase.from("imagenes_propiedades").insert(
    uploadUnitImages.map((uploadImage) => ({
      id_propiedad: unidad.id,
      image_url: uploadImage,
    }))
  );

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  // Paso 4 - Subir a la tabla amenidades con id_amenidad y id_unidad
  if (amenidades && amenidades.length > 0) {
    const { error: errorAmenidades } = await supabase
      .from("amenidades_propiedades")
      .insert(
        amenidades.map((id_amenidad) => ({
          id_propiedad: unidad.id,
          id_amenidad,
        }))
      );
    if (errorAmenidades) {
      console.log("Error al insertar amenidades:", errorAmenidades);
      return {
        ok: false,
        message: errorAmenidades.message,
      };
    }
  }
  revalidatePath("/");
  revalidateTag("properties", "max");
  trackActivity({ tipo_actividad: "propiedad_listada", modulo: "crm", entidad_id: String(unidad.id), entidad_tipo: "propiedad", metadata: { tipo: unitData.tipo, is_unit: true } }).catch(() => { });
  return {
    ok: true,
    message: "Unidad creada con éxito",
  };
}

// ============================================================
// Interface para unidades inline dentro de un desarrollo
// ============================================================
interface InlineUnitPayload {
  unit: {
    tipo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    area: number;
    habitaciones: number;
    banios: number;
    estacionamientos: number;
    amenidades: number[];
    caracteristicas: string;
  };
  unitFiles: File[];
  floorPlanFile?: File;
}

export async function createDevelopmentAction({
  development,
  developmentFiles,
  inlineUnits = [],
}: {
  development: unknown;
  developmentFiles: File[];
  inlineUnits?: InlineUnitPayload[];
}) {
  const { userId } = await verifySession();
  const supabase = await createClient();

  // ── Paso 1: Subir imágenes del desarrollo al storage ─────────────────
  const uploadDevelopmentImages = await Promise.all(
    developmentFiles.map(async (file) => {
      const { error, imageUrl } = await uploadImage({
        file,
        bucket: "properties_images",
      });
      if (error) {
        throw new Error("Error al subir las imagenes del desarrollo: " + error);
      }
      return imageUrl;
    })
  );

  // ── Paso 2: Insertar el desarrollo (sin área/precio/hab) ─────────────
  // ── Paso 2: Insertar el desarrollo (sin área/precio/hab) ─────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const devData = development as any;
  const { data: desarrolloData, error: errorDesarrollo } = await supabase
    .from("propiedades")
    .insert({
      tipo: devData.tipo as Database["public"]["Enums"]["tipo_propiedad"],
      nombre: devData.nombre,
      id_tipo_accion: devData.id_tipo_accion,
      id_tipo_uso: devData.id_tipo_uso,
      descripcion: devData.descripcion,
      descripcion_estado: devData.descripcion_estado,
      descripcion_inversion: devData.descripcion_inversion || null,
      // Location
      id_estado: devData.id_estado,
      id_ciudad: devData.id_ciudad,
      codigo_postal: devData.codigo_postal || null,
      direccion: devData.direccion,
      colonia: devData.colonia || null,
      latitud: devData.latitud || null,
      longitud: devData.longitud || null,
      caracteristicas: devData.caracteristicas || null,
      // Development-specific: no area/precio/hab/baños/estacionamientos
      area: 0,
      area_construida: 0,
      precio: 0,
      habitaciones: 0,
      banios: 0,
      estacionamientos: 0,
      id_usuario: userId,
      is_unit: false,
      parent_id: null,
    })
    .select()
    .single();

  if (errorDesarrollo) {
    return {
      ok: false,
      message: errorDesarrollo.message,
    };
  }

  // ── Paso 3: Imágenes del desarrollo ──────────────────────────────────
  if (uploadDevelopmentImages.length > 0) {
    const { error } = await supabase.from("imagenes_propiedades").insert(
      uploadDevelopmentImages.map((url) => ({
        id_propiedad: desarrolloData.id,
        image_url: url,
      }))
    );

    if (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }

  // ── Paso 4: Amenidades del desarrollo ────────────────────────────────
  const devAmenidades = devData.amenidades as number[] | undefined;
  if (devAmenidades && devAmenidades.length > 0) {
    const { error: errorAmenidades } = await supabase
      .from("amenidades_propiedades")
      .insert(
        devAmenidades.map((id_amenidad) => ({
          id_propiedad: desarrolloData.id,
          id_amenidad,
        }))
      );
    if (errorAmenidades) {
      console.log("Error al insertar amenidades del desarrollo:", errorAmenidades);
    }
  }

  // ── Paso 5: Crear unidades inline ────────────────────────────────────
  for (const inlineUnit of inlineUnits) {
    const { unit, unitFiles, floorPlanFile } = inlineUnit;

    // 5a. Subir imágenes de la unidad
    const uploadedUnitImages = await Promise.all(
      unitFiles.map(async (file) => {
        const { error, imageUrl } = await uploadImage({
          file,
          bucket: "properties_images",
        });
        if (error) {
          throw new Error("Error al subir imagen de unidad: " + error);
        }
        return imageUrl;
      })
    );

    // 5b. Subir floor plan si existe
    let floorPlanUrl: string | null = null;
    if (floorPlanFile) {
      const { error, imageUrl } = await uploadImage({
        file: floorPlanFile,
        bucket: "properties_images",
      });
      if (error) {
        console.log("Error al subir plano:", error);
      } else {
        floorPlanUrl = imageUrl;
      }
    }

    // 5c. Insertar la unidad con parent_id del desarrollo
    const { data: unitData, error: errorUnit } = await supabase
      .from("propiedades")
      .insert({
        tipo: unit.tipo as Database["public"]["Enums"]["tipo_propiedad"],
        nombre: unit.nombre,
        descripcion: unit.descripcion || "",
        descripcion_estado: "",
        precio: unit.precio,
        area: unit.area,
        habitaciones: unit.habitaciones,
        banios: unit.banios,
        estacionamientos: unit.estacionamientos,
        caracteristicas: unit.caracteristicas || null,
        floor_plan_url: floorPlanUrl,
        // Inherit location from development
        id_estado: devData.id_estado,
        id_ciudad: devData.id_ciudad,
        direccion: devData.direccion,
        id_tipo_accion: devData.id_tipo_accion,
        id_tipo_uso: devData.id_tipo_uso,
        id_usuario: userId,
        is_unit: true,
        parent_id: desarrolloData.id,
      })
      .select()
      .single();

    if (errorUnit) {
      console.log(`Error al crear unidad "${unit.nombre}":`, errorUnit);
      continue; // continue with other units
    }

    // 5d. Imágenes de la unidad
    if (uploadedUnitImages.length > 0) {
      await supabase.from("imagenes_propiedades").insert(
        uploadedUnitImages.map((url) => ({
          id_propiedad: unitData.id,
          image_url: url,
        }))
      );
    }

    // 5e. Amenidades de la unidad
    if (unit.amenidades && unit.amenidades.length > 0) {
      await supabase.from("amenidades_propiedades").insert(
        unit.amenidades.map((id_amenidad) => ({
          id_propiedad: unitData.id,
          id_amenidad,
        }))
      );
    }
  }

  revalidatePath("/");
  revalidateTag("properties", "max");
  trackActivity({
    tipo_actividad: "propiedad_listada",
    modulo: "crm",
    entidad_id: String(desarrolloData.id),
    entidad_tipo: "propiedad",
    metadata: {
      tipo: devData.tipo,
      is_unit: false,
      units_count: inlineUnits.length,
    },
  }).catch(() => { });

  return {
    ok: true,
    message: "Desarrollo creado con éxito",
  };
}
