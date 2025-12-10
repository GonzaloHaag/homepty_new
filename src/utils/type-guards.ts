import { DevelopmentWithImages, UnitWithImages } from "@/types";

/**
 * Verifica si una propiedad es una Unidad
 * Las unidades tienen el campo id_desarrollo que referencia al desarrollo al que pertenecen
 */
export function isUnit(
  property: UnitWithImages | DevelopmentWithImages
): property is UnitWithImages {
  return "id_desarrollo" in property;
}