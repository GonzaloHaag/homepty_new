import z from "zod";

// Helper para convertir strings vacíos a null antes de coercer a number
const emptyStringToNull = z
  .string()
  .transform((val) => (val === "" ? null : val))
  .nullable();

const numberOrNull = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
}, z.number().nullable());

export const PropertyApplicationSchema = z.object({
  tipo_operacion: z
    .string()
    .min(1, { message: "Selecciona un tipo de operación" }),
  tipo_propiedad: z.coerce
    .number()
    .min(1, { message: "Selecciona un tipo de propiedad" }),
  presupuesto_min: numberOrNull,
  presupuesto_max: numberOrNull,
  id_ciudad: numberOrNull,
  zona: emptyStringToNull,
  habitaciones: numberOrNull,
  banos: numberOrNull,
  estacionamientos: numberOrNull,
  metros_cuadrados: numberOrNull,
  detalles_adicionales: z
    .string()
    .max(1000, {
      message: "Los detalles no pueden exceder los 1000 caracteres",
    })
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable(),
  nombre_contacto: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .trim(),
  correo_contacto: z.email({ message: "Email inválido" }).trim(),
  telefono_contacto: z
    .string()
    .min(10, { message: "El teléfono debe tener al menos 10 caracteres" })
    .trim(),
});

export type PropertyApplicationSchemaType = z.infer<
  typeof PropertyApplicationSchema
>;
