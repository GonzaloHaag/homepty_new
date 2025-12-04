import z from "zod";

export const BasicInfoSchema = z.object({
  tipo: z.enum(
    ["Departamento", "Local comercial", "Oficina", "Lote", "Casa"],
    {
      message: "Debes seleccionar un tipo de unidad",
    }
  ),
  nombre: z.string().min(4, "Mínimo 4 caracteres"),
  id_tipo_accion: z.number().int().positive().default(1),
  id_tipo_uso: z.number().int().positive().default(1),
  descripcion: z.string().min(4, "Mínimo 4 caracteres"),
  descripcion_estado: z.string().min(10, "Mínimo 10 caracteres"),
  descripcion_inversion: z.string().nullable(),
});

export const LocationCharacteristicsSchema = z.object({
  area: z.number().int().positive("Debe ser positivo"),
  precio: z.number().positive().nullable().refine((val) => val === null || val >= 0 ||  val === undefined, {
    message: "El precio debe ser un número positivo",
  }),
  habitaciones: z.number().int().nullable(),
  banios: z.number().int(),
  estacionamientos: z.number().int().nullable(),
  caracteristicas: z.string().nullable(),
  amenidades: z.array(z.number().int()).nullable(),
  id_estado: z.number("Campo obligatorio").int(),
  id_ciudad: z.number("Campo obligatorio").int(),
  direccion: z.string("Campo obligatorio"),
  codigo_postal: z.string().nullable(),
  colonia: z.string().nullable(),
});

export const PropertyUnitSchema = z.object({
  ...BasicInfoSchema.shape,
  ...LocationCharacteristicsSchema.shape,
  id_usuario: z.uuid(),
});
export type BasicInfo = z.infer<typeof BasicInfoSchema>;
export type LocationCharacteristics = z.infer<typeof LocationCharacteristicsSchema>;
export type Unit = z.infer<typeof PropertyUnitSchema>;
