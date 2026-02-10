-- Migración: Crear tabla site_analytics para tracking de visitas y métricas
-- Fecha: 2025-02-10
-- Descripción: Esta tabla almacena las analíticas de los sitios satélite (visitas, leads, conversiones)

CREATE TABLE IF NOT EXISTS public.site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.user_sites(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('page_view', 'property_view', 'lead_form_submit', 'contact_click', 'phone_click', 'whatsapp_click')),
  page_url TEXT,
  property_id INTEGER REFERENCES public.propiedades(id_propiedad) ON DELETE SET NULL,
  visitor_id VARCHAR(255), -- ID único del visitante (cookie/fingerprint)
  session_id VARCHAR(255), -- ID de sesión
  referrer TEXT, -- De dónde vino el visitante
  user_agent TEXT, -- Navegador y dispositivo
  ip_address INET, -- IP del visitante (para geolocalización)
  country VARCHAR(100),
  city VARCHAR(100),
  device_type VARCHAR(50), -- mobile, desktop, tablet
  metadata JSONB DEFAULT '{}'::jsonb, -- Datos adicionales del evento
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento de consultas
CREATE INDEX idx_site_analytics_site_id ON public.site_analytics(site_id);
CREATE INDEX idx_site_analytics_event_type ON public.site_analytics(event_type);
CREATE INDEX idx_site_analytics_created_at ON public.site_analytics(created_at);
CREATE INDEX idx_site_analytics_visitor_id ON public.site_analytics(visitor_id);
CREATE INDEX idx_site_analytics_session_id ON public.site_analytics(session_id);
CREATE INDEX idx_site_analytics_property_id ON public.site_analytics(property_id);

-- Índice compuesto para consultas de métricas por sitio y fecha
CREATE INDEX idx_site_analytics_site_date ON public.site_analytics(site_id, created_at DESC);

-- Tabla para almacenar métricas agregadas (para mejorar performance de dashboards)
CREATE TABLE IF NOT EXISTS public.site_metrics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES public.user_sites(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  total_leads INTEGER DEFAULT 0,
  property_views INTEGER DEFAULT 0,
  contact_clicks INTEGER DEFAULT 0,
  phone_clicks INTEGER DEFAULT 0,
  whatsapp_clicks INTEGER DEFAULT 0,
  top_properties JSONB DEFAULT '[]'::jsonb, -- Array de {property_id, views}
  top_referrers JSONB DEFAULT '[]'::jsonb, -- Array de {referrer, count}
  devices_breakdown JSONB DEFAULT '{}'::jsonb, -- {mobile: X, desktop: Y, tablet: Z}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_site_date UNIQUE(site_id, date)
);

-- Índices para métricas diarias
CREATE INDEX idx_site_metrics_daily_site_id ON public.site_metrics_daily(site_id);
CREATE INDEX idx_site_metrics_daily_date ON public.site_metrics_daily(date DESC);

-- Trigger para actualizar updated_at en métricas diarias
CREATE OR REPLACE FUNCTION update_site_metrics_daily_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_site_metrics_daily_updated_at
  BEFORE UPDATE ON public.site_metrics_daily
  FOR EACH ROW
  EXECUTE FUNCTION update_site_metrics_daily_updated_at();

-- Función para agregar métricas diarias (se ejecutará con un cron job)
CREATE OR REPLACE FUNCTION aggregate_daily_metrics(target_date DATE DEFAULT CURRENT_DATE - INTERVAL '1 day')
RETURNS void AS $$
BEGIN
  INSERT INTO public.site_metrics_daily (
    site_id,
    date,
    total_visits,
    unique_visitors,
    total_leads,
    property_views,
    contact_clicks,
    phone_clicks,
    whatsapp_clicks
  )
  SELECT
    site_id,
    target_date,
    COUNT(*) FILTER (WHERE event_type = 'page_view') as total_visits,
    COUNT(DISTINCT visitor_id) FILTER (WHERE event_type = 'page_view') as unique_visitors,
    COUNT(*) FILTER (WHERE event_type = 'lead_form_submit') as total_leads,
    COUNT(*) FILTER (WHERE event_type = 'property_view') as property_views,
    COUNT(*) FILTER (WHERE event_type = 'contact_click') as contact_clicks,
    COUNT(*) FILTER (WHERE event_type = 'phone_click') as phone_clicks,
    COUNT(*) FILTER (WHERE event_type = 'whatsapp_click') as whatsapp_clicks
  FROM public.site_analytics
  WHERE DATE(created_at) = target_date
  GROUP BY site_id
  ON CONFLICT (site_id, date) DO UPDATE SET
    total_visits = EXCLUDED.total_visits,
    unique_visitors = EXCLUDED.unique_visitors,
    total_leads = EXCLUDED.total_leads,
    property_views = EXCLUDED.property_views,
    contact_clicks = EXCLUDED.contact_clicks,
    phone_clicks = EXCLUDED.phone_clicks,
    whatsapp_clicks = EXCLUDED.whatsapp_clicks,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Comentarios para documentación
COMMENT ON TABLE public.site_analytics IS 'Almacena eventos de analíticas de los sitios satélite';
COMMENT ON COLUMN public.site_analytics.event_type IS 'Tipo de evento: page_view, property_view, lead_form_submit, etc.';
COMMENT ON COLUMN public.site_analytics.visitor_id IS 'ID único del visitante (cookie/fingerprint)';
COMMENT ON COLUMN public.site_analytics.session_id IS 'ID de sesión del visitante';
COMMENT ON TABLE public.site_metrics_daily IS 'Métricas agregadas por día para mejorar performance de dashboards';
COMMENT ON FUNCTION aggregate_daily_metrics IS 'Función para agregar métricas diarias (ejecutar con cron job)';
