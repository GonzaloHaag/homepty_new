import z from "zod";

export const OfferSchema = z.object({
    action: z.string().min(1, { message: "La acción es requerida" }).trim(),
    min_price: z.number({ message: "Campo obligatorio" }).min(0, { message: "El precio mínimo debe ser mayor o igual a 0" }),
    max_price: z.number({ message: "Campo obligatorio" }).min(0, { message: "El precio máximo debe ser mayor o igual a 0" }),
    ubicaciones: z.string().min(1, { message: "Debe ingresar al menos una ubicación" }).trim(),
    contacto: z.email({ message: "Email inválido" }).trim(),
    nivel_urgencia: z.string().min(1, { message: "El nivel de urgencia es requerido" }).trim(),
    notas_adicionales: z.string().max(500, { message: "Las notas adicionales no pueden exceder los 500 caracteres" }).trim().optional(),
    tipo_propiedad: z.string().min(1, { message: "El tipo de propiedad es requerido" }).trim(),
    status: z.enum(["Activa", "Pausada"], { message: "El estatus es requerido" }),
}).required();
