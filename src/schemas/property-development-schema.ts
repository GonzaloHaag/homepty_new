import z from "zod";

export const BasicInfoDevelopmentSchema = z.object({
  tipo: z.enum(
    ["Preventa", "Edificio", "Plaza Comercial", "Lote"],
    {
      message: "Debes seleccionar un tipo de desarrollo",
    }
  ),
  nombre: z.string().min(4, "Mínimo 4 caracteres"),
  id_tipo_accion: z.number().int().positive().default(1),
  id_tipo_uso: z.number().int().positive().default(1),
  descripcion: z.string().min(10, "Mínimo 10 caracteres"),
  descripcion_estado: z.string().min(10, "Mínimo 10 caracteres"),
  descripcion_inversion: z.string().optional(),
});

export const LocationCharacteristicsDevelopmentSchema = z.object({
  area: z.number().positive("Debe ser positivo"),
  area_construida: z.number().positive("Debe ser positivo").optional(),
  precio: z.number().positive("Debe ser positivo"),
  habitaciones: z.number().int(),
  banios: z.number().int(),
  estacionamientos: z.number().int().optional(),
  caracteristicas: z.string().optional(),
  id_estado: z.number("Campo obligatorio").int(),
  id_ciudad: z.number("Campo obligatorio").int(),
  direccion: z.string("Campo obligatorio").min(5, "Mínimo 5 caracteres"),
  codigo_postal: z.string().optional(),
  colonia: z.string().optional(),
});

export const PropertyDevelopmentSchema = z.object({
  ...BasicInfoDevelopmentSchema.shape,
  ...LocationCharacteristicsDevelopmentSchema.shape
});

export type BasicInfoDevelopment = z.infer<typeof BasicInfoDevelopmentSchema>;
export type LocationCharacteristicsDevelopment = z.infer<typeof LocationCharacteristicsDevelopmentSchema>;
export type Development = z.infer<typeof PropertyDevelopmentSchema>;
