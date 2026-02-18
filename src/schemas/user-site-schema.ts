import z from "zod";

export const UserSiteThemeConfigSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color primario debe ser un código hexadecimal válido"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color secundario debe ser un código hexadecimal válido"),
  logo: z.string().url("Logo debe ser una URL válida").nullable().optional(),
  banner: z.string().url("Banner debe ser una URL válida").nullable().optional(),
  fontFamily: z.string().min(1, "Familia de fuente es requerida"),
});

export const UserSiteSeoConfigSchema = z.object({
  title: z.string().min(10, "Título debe tener al menos 10 caracteres").max(60, "Título no debe exceder 60 caracteres").nullable().optional(),
  description: z.string().min(50, "Descripción debe tener al menos 50 caracteres").max(160, "Descripción no debe exceder 160 caracteres").nullable().optional(),
  keywords: z.array(z.string()).max(10, "No más de 10 keywords").optional(),
});

export const CreateUserSiteSchema = z.object({
  site_name: z.string().min(3, "Nombre del sitio debe tener al menos 3 caracteres").max(255, "Nombre del sitio no debe exceder 255 caracteres"),
  subdomain: z.string()
    .min(3, "Subdominio debe tener al menos 3 caracteres")
    .max(100, "Subdominio no debe exceder 100 caracteres")
    .regex(/^[a-z0-9-]+$/, "Subdominio solo puede contener letras minúsculas, números y guiones")
    .optional(),
  custom_domain: z.string()
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z]{2,})+$/, "Dominio personalizado no es válido")
    .optional()
    .nullable(),
  theme_config: UserSiteThemeConfigSchema.optional(),
  seo_config: UserSiteSeoConfigSchema.optional(),
});

export const UpdateUserSiteSchema = z.object({
  site_name: z.string().min(3, "Nombre del sitio debe tener al menos 3 caracteres").max(255, "Nombre del sitio no debe exceder 255 caracteres").optional(),
  subdomain: z.string()
    .min(3, "Subdominio debe tener al menos 3 caracteres")
    .max(100, "Subdominio no debe exceder 100 caracteres")
    .regex(/^[a-z0-9-]+$/, "Subdominio solo puede contener letras minúsculas, números y guiones")
    .optional()
    .nullable(),
  custom_domain: z.string()
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z]{2,})+$/, "Dominio personalizado no es válido")
    .optional()
    .nullable(),
  is_active: z.boolean().optional(),
  theme_config: UserSiteThemeConfigSchema.optional(),
  seo_config: UserSiteSeoConfigSchema.optional(),
});

export type CreateUserSiteInput = z.infer<typeof CreateUserSiteSchema>;
export type UpdateUserSiteInput = z.infer<typeof UpdateUserSiteSchema>;
export type UserSiteThemeConfig = z.infer<typeof UserSiteThemeConfigSchema>;
export type UserSiteSeoConfig = z.infer<typeof UserSiteSeoConfigSchema>;
