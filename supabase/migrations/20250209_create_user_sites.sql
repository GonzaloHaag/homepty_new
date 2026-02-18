-- Migración: Crear tabla user_sites para gestionar sitios satélite de usuarios
-- Fecha: 2025-02-09
-- Descripción: Esta tabla almacena la configuración de los sitios web personalizados (satélites) de cada usuario

CREATE TABLE IF NOT EXISTS public.user_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
  site_name VARCHAR(255) NOT NULL,
  custom_domain VARCHAR(255),
  subdomain VARCHAR(100) UNIQUE,
  cbf_api_key VARCHAR(64) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  theme_config JSONB DEFAULT '{
    "primaryColor": "#3B82F6",
    "secondaryColor": "#1E40AF",
    "logo": null,
    "banner": null,
    "fontFamily": "Inter"
  }'::jsonb,
  seo_config JSONB DEFAULT '{
    "title": null,
    "description": null,
    "keywords": []
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_site UNIQUE(user_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_user_sites_user_id ON public.user_sites(user_id);
CREATE INDEX idx_user_sites_cbf_api_key ON public.user_sites(cbf_api_key);
CREATE INDEX idx_user_sites_subdomain ON public.user_sites(subdomain);
CREATE INDEX idx_user_sites_is_active ON public.user_sites(is_active);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_user_sites_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_sites_updated_at
  BEFORE UPDATE ON public.user_sites
  FOR EACH ROW
  EXECUTE FUNCTION update_user_sites_updated_at();

-- Comentarios para documentación
COMMENT ON TABLE public.user_sites IS 'Almacena la configuración de los sitios web personalizados (satélites) de cada usuario';
COMMENT ON COLUMN public.user_sites.user_id IS 'ID del usuario propietario del sitio (FK a usuarios)';
COMMENT ON COLUMN public.user_sites.site_name IS 'Nombre del sitio web del usuario';
COMMENT ON COLUMN public.user_sites.custom_domain IS 'Dominio personalizado del usuario (ej: www.mipropiedades.com)';
COMMENT ON COLUMN public.user_sites.subdomain IS 'Subdominio en homepty (ej: juanperez.homepty.com)';
COMMENT ON COLUMN public.user_sites.cbf_api_key IS 'API Key única para autenticar solicitudes del sitio satélite al CBF';
COMMENT ON COLUMN public.user_sites.is_active IS 'Indica si el sitio está activo o pausado';
COMMENT ON COLUMN public.user_sites.theme_config IS 'Configuración del tema visual (colores, logo, tipografía)';
COMMENT ON COLUMN public.user_sites.seo_config IS 'Configuración SEO del sitio (título, descripción, keywords)';
