-- =============================================================================
-- Migration: 20260311_dev_fields_nullable_add_coords (Updated)
-- Description:
-- 1. Make unit-specific fields nullable for developments
-- 2. Add geolocation columns (latitud, longitud)
-- 3. Add floor_plan_url column
-- 4. Add development types to tipo_propiedad ENUM
-- 5. Add all missing AMENITIES from UI to the amenidades table
-- =============================================================================

-- ── 1. Make unit-specific fields nullable ──────────────────────────────────
-- Developments do not have rooms, price, or area — only their UNITS do.
ALTER TABLE propiedades ALTER COLUMN precio DROP NOT NULL;
ALTER TABLE propiedades ALTER COLUMN area DROP NOT NULL;
ALTER TABLE propiedades ALTER COLUMN area_construida DROP NOT NULL;
ALTER TABLE propiedades ALTER COLUMN habitaciones DROP NOT NULL;

-- ── 2 & 3. Add geolocation & floor plan columns ────────────────────────────
ALTER TABLE propiedades ADD COLUMN IF NOT EXISTS latitud float8;
ALTER TABLE propiedades ADD COLUMN IF NOT EXISTS longitud float8;
ALTER TABLE propiedades ADD COLUMN IF NOT EXISTS floor_plan_url text;

-- ── 4. Add Development Types to ENUM ───────────────────────────────────────
-- The UI allows "Vertical", "Horizontal", etc. for developments, but the ENUM
-- 'tipo_propiedad' only contained unit types ("Casa", "Departamento", etc.).
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Vertical';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Horizontal';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Uso Mixto';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Parque Industrial';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Master Plan';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Comercial / Retail';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Hotelero / Turístico';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Oficinas Corporativas';
ALTER TYPE tipo_propiedad ADD VALUE IF NOT EXISTS 'Reconversión / Retrofit';

-- ── 5. Add missing Amenities ───────────────────────────────────────────────
-- Insert all amenities defined in the frontend constants into the DB.
-- Uses ON CONFLICT to update the name in case the ID already exists.
INSERT INTO amenidades (id_amenidad, nombre_amenidad) VALUES
  (1, 'Gimnasio'),
  (2, 'Alberca al aire libre'),
  (3, 'Alberca techada'),
  (4, 'Spa / Sauna / Vapor'),
  (5, 'Jacuzzi'),
  (6, 'Yoga room'),
  (7, 'Salón de eventos'),
  (8, 'Rooftop / Terraza'),
  (9, 'Sala de estar'),
  (10, 'Área de asadores / BBQ'),
  (11, 'Bar / Lounge'),
  (12, 'Kids club'),
  (13, 'Teens club'),
  (14, 'Canchas de pádel'),
  (15, 'Cancha de tenis'),
  (16, 'Área deportiva'),
  (17, 'Pista de jogging'),
  (18, 'Coworking'),
  (19, 'Business center'),
  (20, 'Sala de juntas'),
  (21, 'Elevador'),
  (22, 'Estacionamiento de visitantes'),
  (23, 'Vigilancia 24 hrs'),
  (24, 'Control de acceso'),
  (25, 'Concierge'),
  (26, 'Lavandería'),
  (27, 'Bodega / Storage'),
  (28, 'Áreas verdes / Jardines'),
  (29, 'Roof garden'),
  (30, 'Zona de mascotas (Pet-friendly)'),
  (31, 'Huerto urbano'),
  (32, 'Cine / Sala multimedia'),
  (33, 'Salón de juegos'),
  (34, 'Biblioteca'),
  (35, 'Andenes de carga'),
  (36, 'Patio de maniobras'),
  (37, 'Planta de tratamiento'),
  (38, 'Subestación eléctrica'),
  (39, 'Báscula industrial')
ON CONFLICT (id_amenidad) DO UPDATE SET nombre_amenidad = EXCLUDED.nombre_amenidad;
