import z from "zod";

export const RequestSchema = z.object({
  tipo_operacion: z.enum(["Comprar", "Rentar"], "Tipo de operación inválido"),
  tipo_propiedad_id: z.number("Campo obligatorio"),
  presupuesto_min: z
    .number("Campo obligatorio")
    .min(0, "El presupuesto mínimo no puede ser negativo"),
  presupuesto_max: z
    .number("Campo obligatorio")
    .min(0, "El presupuesto máximo no puede ser negativo"),
  id_estado: z.number("Campo obligatorio"),
  id_ciudad: z.number("Campo obligatorio"),
  zona: z
    .string()
    .max(100, "La zona no puede tener más de 100 caracteres")
    .nullable(),
  habitaciones: z
    .number("Campo obligatorio")
    .min(0, "El número de habitaciones no puede ser negativo"),
  banos: z
    .number("Campo obligatorio")
    .min(0, "El número de baños no puede ser negativo"),
  estacionamientos: z
    .number("Campo obligatorio")
    .min(0, "El número de estacionamientos no puede ser negativo")
    .nullable(),
  metros_cuadrados: z
    .number("Campo obligatorio")
    .min(0, "Los metros cuadrados no pueden ser negativos")
    .nullable(),
  detalles_adicionales: z
    .string()
    .max(500, "Los detalles adicionales no pueden tener más de 500 caracteres")
    .nullable(),
  nombre_contacto: z
    .string()
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  correo_contacto: z.email("Correo electrónico inválido"),
  telefono_contacto: z
    .string()
    .max(15, "El teléfono no puede tener más de 15 caracteres")
    .nullable(),
}).required();
