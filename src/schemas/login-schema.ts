import z from "zod";

export const LoginSchema =  z.object({
    email: z.email({ error: "Email inválido" }).trim(),
    password: z.string().min(6, { error: "La contraseña debe tener al menos 6 caracteres" }).trim(),
});