-- =============================================================================
-- MIGRACIÓN: Taxonomía Inmobiliaria PropTech México v1.0
-- Proyecto: Homepty-new (Supabase)
-- Fecha: 2026-03-01
-- Autor: Homepty Engineering
--
-- INSTRUCCIONES:
-- Ejecutar en el Supabase SQL Editor del proyecto Homepty-new.
-- Ejecutar en orden. Si ya existe alguna tabla, el script es idempotente
-- gracias a las cláusulas IF NOT EXISTS y ON CONFLICT DO NOTHING.
--
-- TABLAS CREADAS:
--   1. taxonomy_verticals      — 8 verticales inmobiliarias
--   2. taxonomy_segments       — Segmentos por vertical
--   3. taxonomy_subsegments    — Subsegmentos por segmento
--   4. taxonomy_attributes     — Definición de atributos EAV
--   5. property_taxonomy_values — Valores EAV por propiedad/unidad
--   6. Columnas nuevas en tabla 'propiedades' (o 'units')
-- =============================================================================

-- ============================================================
-- 1. TABLA: taxonomy_verticals
-- ============================================================
CREATE TABLE IF NOT EXISTS taxonomy_verticals (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  icono       VARCHAR(50),
  orden       SMALLINT NOT NULL DEFAULT 0,
  activo      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE taxonomy_verticals IS
  'Verticales inmobiliarias de primer nivel: Residencial, Comercial, Oficinas, Industrial, etc.';

-- ============================================================
-- 2. TABLA: taxonomy_segments
-- ============================================================
CREATE TABLE IF NOT EXISTS taxonomy_segments (
  id          SERIAL PRIMARY KEY,
  vertical_id INTEGER NOT NULL REFERENCES taxonomy_verticals(id) ON DELETE CASCADE,
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT,
  orden       SMALLINT NOT NULL DEFAULT 0,
  activo      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(vertical_id, nombre)
);

COMMENT ON TABLE taxonomy_segments IS
  'Segmentos de segundo nivel dentro de cada vertical (ej: Unifamiliar, Plurifamiliar dentro de Residencial).';

-- ============================================================
-- 3. TABLA: taxonomy_subsegments
-- ============================================================
CREATE TABLE IF NOT EXISTS taxonomy_subsegments (
  id          SERIAL PRIMARY KEY,
  segment_id  INTEGER NOT NULL REFERENCES taxonomy_segments(id) ON DELETE CASCADE,
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT,
  orden       SMALLINT NOT NULL DEFAULT 0,
  activo      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(segment_id, nombre)
);

COMMENT ON TABLE taxonomy_subsegments IS
  'Tipos específicos de activo (ej: Casa sola, Departamento, Bodega logística, Nave industrial).';

-- ============================================================
-- 4. TABLA: taxonomy_attributes
-- ============================================================
CREATE TABLE IF NOT EXISTS taxonomy_attributes (
  id              SERIAL PRIMARY KEY,
  -- Si es global, aplica a TODOS los subsegmentos de una vertical
  -- Si no es global, aplica solo al subsegmento indicado
  subsegment_id   INTEGER REFERENCES taxonomy_subsegments(id) ON DELETE CASCADE,
  nombre          VARCHAR(150) NOT NULL,
  clave           VARCHAR(100) NOT NULL UNIQUE,  -- snake_case, usado como key en EAV
  tipo_dato       VARCHAR(20) NOT NULL CHECK (tipo_dato IN ('integer','decimal','boolean','enum','text')),
  opciones_enum   JSONB,        -- Array de strings para tipo 'enum'
  es_global       BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE = aplica a toda la vertical
  requerido       BOOLEAN NOT NULL DEFAULT FALSE,
  unidad          VARCHAR(30),  -- 'm', 'm²', 'kVA', 'ton/m²', etc.
  orden           SMALLINT NOT NULL DEFAULT 0,
  activo          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE taxonomy_attributes IS
  'Definición de atributos especializados por subsegmento (modelo EAV). La clave es única en todo el sistema.';

CREATE INDEX IF NOT EXISTS idx_tax_attrs_subsegment ON taxonomy_attributes(subsegment_id);
CREATE INDEX IF NOT EXISTS idx_tax_attrs_global ON taxonomy_attributes(es_global) WHERE es_global = TRUE;

-- ============================================================
-- 5. TABLA: property_taxonomy_values
-- Valores EAV por unidad/propiedad
-- ============================================================
CREATE TABLE IF NOT EXISTS property_taxonomy_values (
  id              BIGSERIAL PRIMARY KEY,
  unit_id         UUID NOT NULL,  -- FK a la tabla de unidades/propiedades
  attribute_id    INTEGER NOT NULL REFERENCES taxonomy_attributes(id) ON DELETE CASCADE,
  valor_texto     TEXT,
  valor_numerico  NUMERIC(15, 4),
  valor_booleano  BOOLEAN,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(unit_id, attribute_id)
);

COMMENT ON TABLE property_taxonomy_values IS
  'Valores EAV de atributos taxonómicos por propiedad/unidad. Cada fila es un par (unidad, atributo, valor).';

CREATE INDEX IF NOT EXISTS idx_ptv_unit ON property_taxonomy_values(unit_id);
CREATE INDEX IF NOT EXISTS idx_ptv_attribute ON property_taxonomy_values(attribute_id);

-- ============================================================
-- 6. COLUMNAS NUEVAS EN LA TABLA DE UNIDADES
-- Ajustar el nombre de la tabla si es diferente ('units', 'propiedades', etc.)
-- ============================================================

-- Verificar si la tabla se llama 'units' o 'propiedades' y ajustar:
-- Si la tabla es 'units':
ALTER TABLE units
  ADD COLUMN IF NOT EXISTS taxonomy_vertical_id   INTEGER REFERENCES taxonomy_verticals(id),
  ADD COLUMN IF NOT EXISTS taxonomy_segment_id    INTEGER REFERENCES taxonomy_segments(id),
  ADD COLUMN IF NOT EXISTS taxonomy_subsegment_id INTEGER REFERENCES taxonomy_subsegments(id);

-- Índices para filtrado eficiente en el marketplace
CREATE INDEX IF NOT EXISTS idx_units_vertical   ON units(taxonomy_vertical_id);
CREATE INDEX IF NOT EXISTS idx_units_segment    ON units(taxonomy_segment_id);
CREATE INDEX IF NOT EXISTS idx_units_subsegment ON units(taxonomy_subsegment_id);

COMMENT ON COLUMN units.taxonomy_vertical_id   IS 'Vertical inmobiliaria (Residencial, Comercial, etc.)';
COMMENT ON COLUMN units.taxonomy_segment_id    IS 'Segmento dentro de la vertical';
COMMENT ON COLUMN units.taxonomy_subsegment_id IS 'Tipo específico del activo';

-- ============================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================

-- taxonomy_verticals — lectura pública
ALTER TABLE taxonomy_verticals ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "taxonomy_verticals_public_read"
  ON taxonomy_verticals FOR SELECT USING (TRUE);
CREATE POLICY IF NOT EXISTS "taxonomy_verticals_admin_write"
  ON taxonomy_verticals FOR ALL
  USING (auth.role() = 'service_role');

-- taxonomy_segments — lectura pública
ALTER TABLE taxonomy_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "taxonomy_segments_public_read"
  ON taxonomy_segments FOR SELECT USING (TRUE);
CREATE POLICY IF NOT EXISTS "taxonomy_segments_admin_write"
  ON taxonomy_segments FOR ALL
  USING (auth.role() = 'service_role');

-- taxonomy_subsegments — lectura pública
ALTER TABLE taxonomy_subsegments ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "taxonomy_subsegments_public_read"
  ON taxonomy_subsegments FOR SELECT USING (TRUE);
CREATE POLICY IF NOT EXISTS "taxonomy_subsegments_admin_write"
  ON taxonomy_subsegments FOR ALL
  USING (auth.role() = 'service_role');

-- taxonomy_attributes — lectura pública
ALTER TABLE taxonomy_attributes ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "taxonomy_attributes_public_read"
  ON taxonomy_attributes FOR SELECT USING (TRUE);
CREATE POLICY IF NOT EXISTS "taxonomy_attributes_admin_write"
  ON taxonomy_attributes FOR ALL
  USING (auth.role() = 'service_role');

-- property_taxonomy_values — lectura pública, escritura autenticada
ALTER TABLE property_taxonomy_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "ptv_public_read"
  ON property_taxonomy_values FOR SELECT USING (TRUE);
CREATE POLICY IF NOT EXISTS "ptv_authenticated_write"
  ON property_taxonomy_values FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY IF NOT EXISTS "ptv_owner_update"
  ON property_taxonomy_values FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ============================================================
-- 8. SEED: Datos de la Taxonomía Inmobiliaria PropTech México v1.0
-- ============================================================

-- ---- VERTICALES ----
INSERT INTO taxonomy_verticals (id, nombre, descripcion, icono, orden) VALUES
  (1, 'Residencial',              'Propiedades para uso habitacional',                    'home',        1),
  (2, 'Comercial',                'Propiedades para comercio y retail',                   'store',       2),
  (3, 'Oficinas',                 'Espacios de trabajo corporativos y flexibles',          'building',    3),
  (4, 'Industrial',               'Naves, bodegas y parques industriales',                'factory',     4),
  (5, 'Hospitalidad',             'Hoteles, resorts y alojamiento turístico',             'hotel',       5),
  (6, 'Salud',                    'Clínicas, hospitales y consultorios',                  'heart-pulse', 6),
  (7, 'Terrenos y Rural',         'Terrenos, lotes y propiedades rurales',               'map',         7),
  (8, 'Proyectos Especializados', 'Desarrollos especiales y usos mixtos',                'layers',      8)
ON CONFLICT (nombre) DO NOTHING;

-- Resetear secuencia para que el siguiente ID sea correcto
SELECT setval('taxonomy_verticals_id_seq', (SELECT MAX(id) FROM taxonomy_verticals));

-- ---- SEGMENTOS ----
INSERT INTO taxonomy_segments (id, vertical_id, nombre, orden) VALUES
  -- Residencial
  (1,  1, 'Unifamiliar',              1),
  (2,  1, 'Plurifamiliar',            2),
  (3,  1, 'Vacacional / Turístico',   3),
  (4,  1, 'Senior Living',            4),
  -- Comercial
  (5,  2, 'Retail',                   1),
  (6,  2, 'Restaurantes y F&B',       2),
  (7,  2, 'Entretenimiento',          3),
  -- Oficinas
  (8,  3, 'Corporativo',              1),
  (9,  3, 'Coworking / Flex',         2),
  (10, 3, 'Consultorio Profesional',  3),
  -- Industrial
  (11, 4, 'Logística y Distribución', 1),
  (12, 4, 'Manufactura',              2),
  (13, 4, 'Almacenamiento Frío',      3),
  (14, 4, 'Data Center',              4),
  -- Hospitalidad
  (15, 5, 'Hoteles y Resorts',        1),
  (16, 5, 'Alojamiento Alternativo',  2),
  -- Salud
  (17, 6, 'Clínicas y Consultorios',  1),
  (18, 6, 'Hospitales',               2),
  (19, 6, 'Bienestar y Estética',     3),
  -- Terrenos y Rural
  (20, 7, 'Terreno Urbano',           1),
  (21, 7, 'Terreno Suburbano',        2),
  (22, 7, 'Rural / Agropecuario',     3),
  -- Proyectos Especializados
  (23, 8, 'Uso Mixto',                1),
  (24, 8, 'Educativo',                2),
  (25, 8, 'Religioso / Institucional',3)
ON CONFLICT (vertical_id, nombre) DO NOTHING;

SELECT setval('taxonomy_segments_id_seq', (SELECT MAX(id) FROM taxonomy_segments));

-- ---- SUBSEGMENTOS ----
INSERT INTO taxonomy_subsegments (id, segment_id, nombre, orden) VALUES
  -- Residencial > Unifamiliar
  (1,  1, 'Casa sola',                1),
  (2,  1, 'Casa en condominio',       2),
  (3,  1, 'Villa / Residencia',       3),
  (4,  1, 'Casa de campo',            4),
  -- Residencial > Plurifamiliar
  (5,  2, 'Departamento',             1),
  (6,  2, 'Loft',                     2),
  (7,  2, 'Penthouse',                3),
  (8,  2, 'Studio',                   4),
  (9,  2, 'Dúplex',                   5),
  -- Residencial > Vacacional
  (10, 3, 'Casa de playa',            1),
  (11, 3, 'Cabaña / Glamping',        2),
  (12, 3, 'Departamento vacacional',  3),
  -- Residencial > Senior Living
  (13, 4, 'Residencia para adultos mayores', 1),
  -- Comercial > Retail
  (14, 5, 'Local comercial',          1),
  (15, 5, 'Plaza comercial',          2),
  (16, 5, 'Centro comercial',         3),
  (17, 5, 'Showroom',                 4),
  -- Comercial > Restaurantes
  (18, 6, 'Restaurante',              1),
  (19, 6, 'Dark kitchen',             2),
  (20, 6, 'Bar / Cantina',            3),
  -- Comercial > Entretenimiento
  (21, 7, 'Cine / Teatro',            1),
  (22, 7, 'Gimnasio / Spa',           2),
  -- Oficinas > Corporativo
  (23, 8, 'Oficina Clase A',          1),
  (24, 8, 'Oficina Clase A+',         2),
  (25, 8, 'Oficina Clase B',          3),
  -- Oficinas > Coworking
  (26, 9, 'Espacio coworking',        1),
  (27, 9, 'Oficina privada flex',     2),
  -- Oficinas > Consultorio
  (28, 10,'Consultorio médico',       1),
  (29, 10,'Despacho jurídico',        2),
  -- Industrial > Logística
  (30, 11,'Bodega logística',         1),
  (31, 11,'Centro de distribución',   2),
  (32, 11,'Last-mile hub',            3),
  -- Industrial > Manufactura
  (33, 12,'Nave industrial',          1),
  (34, 12,'Parque industrial',        2),
  (35, 12,'Nave a la medida (BTS)',   3),
  -- Industrial > Frío
  (36, 13,'Cámara frigorífica',       1),
  (37, 13,'Almacén temperatura controlada', 2),
  -- Industrial > Data Center
  (38, 14,'Data center Tier III',     1),
  (39, 14,'Data center Tier IV',      2),
  -- Hospitalidad > Hoteles
  (40, 15,'Hotel boutique',           1),
  (41, 15,'Resort todo incluido',     2),
  (42, 15,'Hotel de negocios',        3),
  -- Hospitalidad > Alternativo
  (43, 16,'Hostal / Albergue',        1),
  (44, 16,'Airbnb / Renta vacacional',2),
  -- Salud > Clínicas
  (45, 17,'Consultorio médico',       1),
  (46, 17,'Clínica especializada',    2),
  -- Salud > Hospitales
  (47, 18,'Hospital general',         1),
  (48, 18,'Hospital especializado',   2),
  -- Salud > Bienestar
  (49, 19,'Spa / Centro de bienestar',1),
  -- Terrenos > Urbano
  (50, 20,'Lote habitacional',        1),
  (51, 20,'Lote comercial',           2),
  (52, 20,'Lote mixto',               3),
  -- Terrenos > Suburbano
  (53, 21,'Lote suburbano',           1),
  (54, 21,'Fraccionamiento',          2),
  -- Terrenos > Rural
  (55, 22,'Rancho / Hacienda',        1),
  (56, 22,'Terreno agrícola',         2),
  (57, 22,'Terreno forestal',         3),
  -- Proyectos > Uso Mixto
  (58, 23,'Desarrollo uso mixto',     1),
  (59, 23,'Torre mixta',              2),
  -- Proyectos > Educativo
  (60, 24,'Escuela / Colegio',        1),
  (61, 24,'Universidad / Campus',     2),
  -- Proyectos > Institucional
  (62, 25,'Iglesia / Templo',         1),
  (63, 25,'Edificio gubernamental',   2)
ON CONFLICT (segment_id, nombre) DO NOTHING;

SELECT setval('taxonomy_subsegments_id_seq', (SELECT MAX(id) FROM taxonomy_subsegments));

-- ---- ATRIBUTOS GLOBALES (aplican a todos) ----
INSERT INTO taxonomy_attributes (clave, nombre, tipo_dato, es_global, requerido, orden) VALUES
  ('habitaciones',      'Habitaciones',          'integer', TRUE, FALSE, 1),
  ('banios',            'Baños',                 'decimal', TRUE, FALSE, 2),
  ('estacionamientos',  'Estacionamientos',      'integer', TRUE, FALSE, 3),
  ('area_construida',   'Área construida (m²)',  'decimal', TRUE, FALSE, 4),
  ('area_terreno',      'Área de terreno (m²)',  'decimal', TRUE, FALSE, 5),
  ('antiguedad',        'Antigüedad (años)',     'integer', TRUE, FALSE, 6),
  ('etapa_constructiva','Etapa constructiva',    'enum',    TRUE, FALSE, 7),
  ('regimen_propiedad', 'Régimen de propiedad',  'enum',    TRUE, FALSE, 8)
ON CONFLICT (clave) DO NOTHING;

-- Opciones enum para atributos globales
UPDATE taxonomy_attributes SET opciones_enum = '["Nueva","En construcción","Preventa","Usada","Remodelada"]'
  WHERE clave = 'etapa_constructiva';
UPDATE taxonomy_attributes SET opciones_enum = '["Condominio","Ejidal","Privada","Propiedad en fideicomiso","Tiempo compartido"]'
  WHERE clave = 'regimen_propiedad';

-- ---- ATRIBUTOS ESPECIALIZADOS: Residencial Unifamiliar ----
INSERT INTO taxonomy_attributes (subsegment_id, clave, nombre, tipo_dato, es_global, requerido, orden) VALUES
  -- Casa sola (id=1)
  (1, 'niveles',       'Niveles',       'integer', FALSE, FALSE, 10),
  (1, 'jardin',        'Jardín',        'boolean', FALSE, FALSE, 11),
  (1, 'alberca',       'Alberca',       'boolean', FALSE, FALSE, 12),
  (1, 'bodega',        'Bodega',        'boolean', FALSE, FALSE, 13),
  -- Departamento (id=5)
  (5, 'piso',          'Piso',          'integer', FALSE, FALSE, 10),
  (5, 'elevador',      'Elevador',      'boolean', FALSE, FALSE, 11),
  (5, 'roof_garden',   'Roof garden',   'boolean', FALSE, FALSE, 12),
  (5, 'alberca_dep',   'Alberca',       'boolean', FALSE, FALSE, 13),
  -- Penthouse (id=7)
  (7, 'terraza_m2',    'Terraza (m²)',  'decimal', FALSE, FALSE, 10),
  (7, 'piso_ph',       'Piso',          'integer', FALSE, FALSE, 11)
ON CONFLICT (clave) DO NOTHING;

-- ---- ATRIBUTOS ESPECIALIZADOS: Industrial ----
INSERT INTO taxonomy_attributes (subsegment_id, clave, nombre, tipo_dato, es_global, requerido, unidad, orden) VALUES
  -- Bodega logística (id=30)
  (30, 'altura_libre',       'Altura libre',          'decimal', FALSE, FALSE, 'm',      10),
  (30, 'andenes_carga',      'Andenes de carga',      'integer', FALSE, FALSE, NULL,     11),
  (30, 'piso_industrial',    'Tipo de piso',          'enum',    FALSE, FALSE, NULL,     12),
  (30, 'clase_bodega',       'Clase de bodega',       'enum',    FALSE, FALSE, NULL,     13),
  (30, 'patio_maniobras_m2', 'Patio de maniobras',   'decimal', FALSE, FALSE, 'm²',     14),
  -- Nave industrial (id=33)
  (33, 'altura_libre_nave',  'Altura libre',          'decimal', FALSE, FALSE, 'm',      10),
  (33, 'capacidad_carga',    'Capacidad de carga',    'decimal', FALSE, FALSE, 'ton/m²', 11),
  (33, 'suministro_electrico','Suministro eléctrico', 'integer', FALSE, FALSE, 'kVA',    12),
  (33, 'crane_capacity',     'Grúa (ton)',            'decimal', FALSE, FALSE, 'ton',    13)
ON CONFLICT (clave) DO NOTHING;

-- Opciones enum para industrial
UPDATE taxonomy_attributes SET opciones_enum = '["Concreto armado","Epóxico","Asfalto","Adocreto"]'
  WHERE clave = 'piso_industrial';
UPDATE taxonomy_attributes SET opciones_enum = '["Clase A","Clase A+","Clase B","Clase C"]'
  WHERE clave = 'clase_bodega';

-- ---- ATRIBUTOS ESPECIALIZADOS: Oficinas ----
INSERT INTO taxonomy_attributes (subsegment_id, clave, nombre, tipo_dato, es_global, requerido, orden) VALUES
  -- Oficina Clase A (id=23)
  (23, 'clase_edificio',      'Clase de edificio',    'enum',    FALSE, FALSE, 10),
  (23, 'plantas_privativas',  'Plantas privativas',   'boolean', FALSE, FALSE, 11),
  (23, 'certificacion_leed',  'Certificación LEED',   'boolean', FALSE, FALSE, 12),
  (23, 'eficiencia_planta',   'Eficiencia de planta', 'decimal', FALSE, FALSE, 13),
  -- Coworking (id=26)
  (26, 'puestos_disponibles', 'Puestos disponibles',  'integer', FALSE, FALSE, 10),
  (26, 'sala_juntas',         'Sala de juntas',       'boolean', FALSE, FALSE, 11)
ON CONFLICT (clave) DO NOTHING;

UPDATE taxonomy_attributes SET opciones_enum = '["Clase A","Clase A+","Clase B","Clase C"]'
  WHERE clave = 'clase_edificio';

-- ---- ATRIBUTOS ESPECIALIZADOS: Comercial ----
INSERT INTO taxonomy_attributes (subsegment_id, clave, nombre, tipo_dato, es_global, requerido, unidad, orden) VALUES
  -- Local comercial (id=14)
  (14, 'frente_ml',     'Frente',           'decimal', FALSE, FALSE, 'm',   10),
  (14, 'tipo_local',    'Tipo de local',    'enum',    FALSE, FALSE, NULL,  11),
  (14, 'mezzanine',     'Mezzanine',        'boolean', FALSE, FALSE, NULL,  12)
ON CONFLICT (clave) DO NOTHING;

UPDATE taxonomy_attributes SET opciones_enum = '["Planta baja","Mezzanine","Sótano","Esquina","Interior"]'
  WHERE clave = 'tipo_local';

-- ---- ATRIBUTOS ESPECIALIZADOS: Terrenos ----
INSERT INTO taxonomy_attributes (subsegment_id, clave, nombre, tipo_dato, es_global, requerido, orden) VALUES
  -- Lote habitacional (id=50)
  (50, 'uso_suelo',         'Uso de suelo',        'enum',    FALSE, FALSE, 10),
  (50, 'coeficiente_uso',   'CUS',                 'decimal', FALSE, FALSE, 11),
  (50, 'coeficiente_ocupacion','COS',              'decimal', FALSE, FALSE, 12),
  (50, 'frente_terreno',    'Frente (m)',           'decimal', FALSE, FALSE, 13),
  (50, 'fondo_terreno',     'Fondo (m)',            'decimal', FALSE, FALSE, 14),
  (50, 'topografia',        'Topografía',           'enum',    FALSE, FALSE, 15)
ON CONFLICT (clave) DO NOTHING;

UPDATE taxonomy_attributes SET opciones_enum = '["Habitacional","Comercial","Mixto","Industrial","Agrícola","Forestal","Conservación"]'
  WHERE clave = 'uso_suelo';
UPDATE taxonomy_attributes SET opciones_enum = '["Plano","Semiplano","Irregular","Pendiente leve","Pendiente pronunciada"]'
  WHERE clave = 'topografia';

-- ============================================================
-- 9. FUNCIÓN: updated_at automático
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['taxonomy_verticals','taxonomy_segments','taxonomy_subsegments','taxonomy_attributes','property_taxonomy_values']
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'trg_' || t || '_updated_at'
    ) THEN
      EXECUTE format(
        'CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
        t, t
      );
    END IF;
  END LOOP;
END;
$$;

-- ============================================================
-- FIN DE LA MIGRACIÓN
-- Verificar con:
--   SELECT COUNT(*) FROM taxonomy_verticals;   -- debe ser 8
--   SELECT COUNT(*) FROM taxonomy_segments;    -- debe ser ~25
--   SELECT COUNT(*) FROM taxonomy_subsegments; -- debe ser ~63
--   SELECT COUNT(*) FROM taxonomy_attributes;  -- debe ser ~40+
-- ============================================================
