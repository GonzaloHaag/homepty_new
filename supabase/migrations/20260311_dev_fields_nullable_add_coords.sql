-- =============================================================================
-- Migration: make_dev_fields_nullable_add_coords
-- Description: Make unit-specific fields nullable for developments,
--              add geolocation columns, and add floor_plan_url
-- =============================================================================

-- Make unit-specific fields nullable for developments
-- A development doesn't have rooms, price, or area — only its UNITS do.
ALTER TABLE propiedades ALTER COLUMN precio DROP NOT NULL;
ALTER TABLE propiedades ALTER COLUMN area DROP NOT NULL;
ALTER TABLE propiedades ALTER COLUMN habitaciones DROP NOT NULL;

-- Add geolocation columns (captured via Mapbox geocoder)
ALTER TABLE propiedades ADD COLUMN IF NOT EXISTS latitud float8;
ALTER TABLE propiedades ADD COLUMN IF NOT EXISTS longitud float8;

-- Add floor_plan_url column for units (separate from photo carousel)
ALTER TABLE propiedades ADD COLUMN IF NOT EXISTS floor_plan_url text;
