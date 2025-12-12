import z from "zod";

export const OfferSchema = z.object({
    action: z.string().min(1, { message: "La acción es requerida" }).trim(),
    min_price: z.number().min(0, { message: "El precio mínimo debe ser mayor o igual a 0" }),
    max_price: z.number().min(0, { message: "El precio máximo debe ser mayor o igual a 0" }),
    ubicaciones: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                return val.split(",").map((u) => u.trim()).filter((u) => u.length > 0);
            }
            return val;
        },
        z.array(z.string().min(1)).min(1, { message: "Debe ingresar al menos una ubicación" })
    ),
    contacto: z.string().email({ message: "Email inválido" }).trim(),
    nivel_urgencia: z.string().min(1, { message: "El nivel de urgencia es requerido" }).trim(),
    notas_adicionales: z.string().max(500, { message: "Las notas adicionales no pueden exceder los 500 caracteres" }).trim().optional(),
    tipo_propiedad: z.enum([
        "Casa",
        "Departamento",
        "Terreno",
        "Oficina",
        "Local comercial",
        "Bodega",
        "Loft",
        "Lote",
        "Nave industrial",
    ], { message: "El tipo de propiedad es requerido" }),
    status: z.enum(["Activa", "Pausada"], { message: "El estatus es requerido" }),
});

export type Offer = z.infer<typeof OfferSchema & { id: number, user_id:string }>;