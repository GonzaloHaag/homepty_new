"use client";
/**
 * Hook useTaxonomy
 * Gestiona el estado de la selección taxonómica en cascada:
 * Vertical > Segmento > Subsegmento > Atributos especializados
 *
 * Diseñado para ser usado tanto en el formulario de creación de propiedad
 * como en el header de filtros del marketplace.
 */
import { useState, useEffect, useCallback } from "react";
import {
  brainTaxonomy,
  type TaxVertical,
  type TaxSegment,
  type TaxSubsegment,
  type TaxAttribute,
  type TaxonomyTree,
} from "@/lib/brain-client";

// ============================================================
// TAXONOMÍA ESTÁTICA DE FALLBACK
// Se usa cuando el Brain no está disponible o BRAIN_URL no está configurado.
// Refleja la Taxonomía Inmobiliaria PropTech México v1.0
// ============================================================

export const TAXONOMY_FALLBACK: TaxonomyTree = {
  verticals: [
    {
      id: 1, nombre: "Residencial", descripcion: "Propiedades para uso habitacional", icono: "home", activo: true,
      segments: [
        {
          id: 1, verticalId: 1, nombre: "Unifamiliar", descripcion: null, activo: true,
          subsegments: [
            { id: 1, segmentId: 1, nombre: "Casa sola", descripcion: null, activo: true },
            { id: 2, segmentId: 1, nombre: "Casa en condominio", descripcion: null, activo: true },
            { id: 3, segmentId: 1, nombre: "Villa / Residencia", descripcion: null, activo: true },
          ],
        },
        {
          id: 2, verticalId: 1, nombre: "Plurifamiliar", descripcion: null, activo: true,
          subsegments: [
            { id: 4, segmentId: 2, nombre: "Departamento", descripcion: null, activo: true },
            { id: 5, segmentId: 2, nombre: "Loft", descripcion: null, activo: true },
            { id: 6, segmentId: 2, nombre: "Penthouse", descripcion: null, activo: true },
            { id: 7, segmentId: 2, nombre: "Studio", descripcion: null, activo: true },
          ],
        },
        {
          id: 3, verticalId: 1, nombre: "Vacacional / Turístico", descripcion: null, activo: true,
          subsegments: [
            { id: 8, segmentId: 3, nombre: "Casa de playa", descripcion: null, activo: true },
            { id: 9, segmentId: 3, nombre: "Cabaña / Glamping", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 2, nombre: "Comercial", descripcion: "Propiedades para comercio y retail", icono: "store", activo: true,
      segments: [
        {
          id: 5, verticalId: 2, nombre: "Retail", descripcion: null, activo: true,
          subsegments: [
            { id: 14, segmentId: 5, nombre: "Local comercial", descripcion: null, activo: true },
            { id: 15, segmentId: 5, nombre: "Plaza comercial", descripcion: null, activo: true },
            { id: 16, segmentId: 5, nombre: "Centro comercial", descripcion: null, activo: true },
          ],
        },
        {
          id: 6, verticalId: 2, nombre: "Restaurantes y F&B", descripcion: null, activo: true,
          subsegments: [
            { id: 17, segmentId: 6, nombre: "Restaurante", descripcion: null, activo: true },
            { id: 18, segmentId: 6, nombre: "Dark kitchen", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 3, nombre: "Oficinas", descripcion: "Espacios de trabajo corporativos y flexibles", icono: "building", activo: true,
      segments: [
        {
          id: 8, verticalId: 3, nombre: "Corporativo", descripcion: null, activo: true,
          subsegments: [
            { id: 21, segmentId: 8, nombre: "Oficina Clase A", descripcion: null, activo: true },
            { id: 22, segmentId: 8, nombre: "Oficina Clase B", descripcion: null, activo: true },
          ],
        },
        {
          id: 9, verticalId: 3, nombre: "Coworking / Flex", descripcion: null, activo: true,
          subsegments: [
            { id: 23, segmentId: 9, nombre: "Espacio coworking", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 4, nombre: "Industrial", descripcion: "Naves, bodegas y parques industriales", icono: "factory", activo: true,
      segments: [
        {
          id: 11, verticalId: 4, nombre: "Logística y Distribución", descripcion: null, activo: true,
          subsegments: [
            { id: 27, segmentId: 11, nombre: "Bodega logística", descripcion: null, activo: true },
            { id: 28, segmentId: 11, nombre: "Centro de distribución", descripcion: null, activo: true },
          ],
        },
        {
          id: 12, verticalId: 4, nombre: "Manufactura", descripcion: null, activo: true,
          subsegments: [
            { id: 29, segmentId: 12, nombre: "Nave industrial", descripcion: null, activo: true },
            { id: 30, segmentId: 12, nombre: "Parque industrial", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 5, nombre: "Hospitalidad", descripcion: "Hoteles, resorts y alojamiento turístico", icono: "hotel", activo: true,
      segments: [
        {
          id: 15, verticalId: 5, nombre: "Hoteles y Resorts", descripcion: null, activo: true,
          subsegments: [
            { id: 35, segmentId: 15, nombre: "Hotel boutique", descripcion: null, activo: true },
            { id: 36, segmentId: 15, nombre: "Resort todo incluido", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 6, nombre: "Salud", descripcion: "Clínicas, hospitales y consultorios", icono: "heart-pulse", activo: true,
      segments: [
        {
          id: 17, verticalId: 6, nombre: "Clínicas y Consultorios", descripcion: null, activo: true,
          subsegments: [
            { id: 39, segmentId: 17, nombre: "Consultorio médico", descripcion: null, activo: true },
            { id: 40, segmentId: 17, nombre: "Clínica especializada", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 7, nombre: "Terrenos y Rural", descripcion: "Terrenos, lotes y propiedades rurales", icono: "map", activo: true,
      segments: [
        {
          id: 19, verticalId: 7, nombre: "Terreno Urbano", descripcion: null, activo: true,
          subsegments: [
            { id: 43, segmentId: 19, nombre: "Lote habitacional", descripcion: null, activo: true },
            { id: 44, segmentId: 19, nombre: "Lote comercial", descripcion: null, activo: true },
          ],
        },
        {
          id: 20, verticalId: 7, nombre: "Rural / Agropecuario", descripcion: null, activo: true,
          subsegments: [
            { id: 45, segmentId: 20, nombre: "Rancho / Hacienda", descripcion: null, activo: true },
            { id: 46, segmentId: 20, nombre: "Terreno agrícola", descripcion: null, activo: true },
          ],
        },
      ],
    },
    {
      id: 8, nombre: "Proyectos Especializados", descripcion: "Desarrollos especiales y usos mixtos", icono: "layers", activo: true,
      segments: [
        {
          id: 22, verticalId: 8, nombre: "Uso Mixto", descripcion: null, activo: true,
          subsegments: [
            { id: 47, segmentId: 22, nombre: "Desarrollo uso mixto", descripcion: null, activo: true },
          ],
        },
      ],
    },
  ],
};

// Atributos de filtro por subsegmento (fallback estático)
// En producción estos vienen del Brain API
export const DYNAMIC_FILTER_ATTRIBUTES: Record<number, TaxAttribute[]> = {
  // Residencial Unifamiliar - Casa sola
  1: [
    { id: 101, nombre: "Habitaciones", clave: "habitaciones", tipoDato: "integer", opcionesEnum: null, esGlobal: true, subsegmentId: null, requerido: false, unidad: null, orden: 1 },
    { id: 102, nombre: "Baños", clave: "banios", tipoDato: "decimal", opcionesEnum: null, esGlobal: true, subsegmentId: null, requerido: false, unidad: null, orden: 2 },
    { id: 103, nombre: "Estacionamientos", clave: "estacionamientos", tipoDato: "integer", opcionesEnum: null, esGlobal: true, subsegmentId: null, requerido: false, unidad: null, orden: 3 },
    { id: 201, nombre: "Niveles", clave: "niveles", tipoDato: "integer", opcionesEnum: null, esGlobal: false, subsegmentId: 1, requerido: false, unidad: null, orden: 4 },
    { id: 202, nombre: "Jardín", clave: "jardin", tipoDato: "boolean", opcionesEnum: null, esGlobal: false, subsegmentId: 1, requerido: false, unidad: null, orden: 5 },
    { id: 203, nombre: "Alberca", clave: "alberca", tipoDato: "boolean", opcionesEnum: null, esGlobal: false, subsegmentId: 1, requerido: false, unidad: null, orden: 6 },
  ],
  // Residencial Plurifamiliar - Departamento
  4: [
    { id: 101, nombre: "Habitaciones", clave: "habitaciones", tipoDato: "integer", opcionesEnum: null, esGlobal: true, subsegmentId: null, requerido: false, unidad: null, orden: 1 },
    { id: 102, nombre: "Baños", clave: "banios", tipoDato: "decimal", opcionesEnum: null, esGlobal: true, subsegmentId: null, requerido: false, unidad: null, orden: 2 },
    { id: 103, nombre: "Estacionamientos", clave: "estacionamientos", tipoDato: "integer", opcionesEnum: null, esGlobal: true, subsegmentId: null, requerido: false, unidad: null, orden: 3 },
    { id: 210, nombre: "Piso", clave: "piso", tipoDato: "integer", opcionesEnum: null, esGlobal: false, subsegmentId: 4, requerido: false, unidad: null, orden: 4 },
    { id: 211, nombre: "Elevador", clave: "elevador", tipoDato: "boolean", opcionesEnum: null, esGlobal: false, subsegmentId: 4, requerido: false, unidad: null, orden: 5 },
  ],
  // Industrial - Bodega logística
  27: [
    { id: 104, nombre: "Altura libre (m)", clave: "altura_libre", tipoDato: "decimal", opcionesEnum: null, esGlobal: false, subsegmentId: 27, requerido: false, unidad: "m", orden: 1 },
    { id: 105, nombre: "Andenes de carga", clave: "andenes_carga", tipoDato: "integer", opcionesEnum: null, esGlobal: false, subsegmentId: 27, requerido: false, unidad: null, orden: 2 },
    { id: 106, nombre: "Piso industrial", clave: "piso_industrial", tipoDato: "enum", opcionesEnum: ["Concreto armado", "Epóxico", "Asfalto"], esGlobal: false, subsegmentId: 27, requerido: false, unidad: null, orden: 3 },
    { id: 107, nombre: "Clase de bodega", clave: "clase_bodega", tipoDato: "enum", opcionesEnum: ["Clase A", "Clase B", "Clase C"], esGlobal: false, subsegmentId: 27, requerido: false, unidad: null, orden: 4 },
  ],
  // Industrial - Nave industrial
  29: [
    { id: 104, nombre: "Altura libre (m)", clave: "altura_libre", tipoDato: "decimal", opcionesEnum: null, esGlobal: false, subsegmentId: 29, requerido: false, unidad: "m", orden: 1 },
    { id: 108, nombre: "Capacidad de carga (ton/m²)", clave: "capacidad_carga", tipoDato: "decimal", opcionesEnum: null, esGlobal: false, subsegmentId: 29, requerido: false, unidad: "ton/m²", orden: 2 },
    { id: 109, nombre: "Suministro eléctrico (kVA)", clave: "suministro_electrico", tipoDato: "integer", opcionesEnum: null, esGlobal: false, subsegmentId: 29, requerido: false, unidad: "kVA", orden: 3 },
  ],
  // Oficinas - Clase A
  21: [
    { id: 110, nombre: "Clase de edificio", clave: "clase_edificio", tipoDato: "enum", opcionesEnum: ["Clase A", "Clase A+", "Clase B"], esGlobal: false, subsegmentId: 21, requerido: false, unidad: null, orden: 1 },
    { id: 111, nombre: "Plantas privativas", clave: "plantas_privativas", tipoDato: "boolean", opcionesEnum: null, esGlobal: false, subsegmentId: 21, requerido: false, unidad: null, orden: 2 },
    { id: 112, nombre: "Certificación LEED", clave: "certificacion_leed", tipoDato: "boolean", opcionesEnum: null, esGlobal: false, subsegmentId: 21, requerido: false, unidad: null, orden: 3 },
  ],
  // Comercial - Local comercial
  14: [
    { id: 113, nombre: "Frente (m)", clave: "frente_ml", tipoDato: "decimal", opcionesEnum: null, esGlobal: false, subsegmentId: 14, requerido: false, unidad: "m", orden: 1 },
    { id: 114, nombre: "Tipo de local", clave: "tipo_local", tipoDato: "enum", opcionesEnum: ["Planta baja", "Mezzanine", "Sótano", "Esquina"], esGlobal: false, subsegmentId: 14, requerido: false, unidad: null, orden: 2 },
  ],
};

// ============================================================
// HOOK
// ============================================================

export interface TaxonomySelection {
  verticalId: number | null;
  segmentId: number | null;
  subsegmentId: number | null;
}

export interface UseTaxonomyReturn {
  // Datos del árbol
  tree: TaxonomyTree;
  isLoading: boolean;
  // Selección actual
  selection: TaxonomySelection;
  // Opciones disponibles según la selección en cascada
  availableVerticals: TaxVertical[];
  availableSegments: TaxSegment[];
  availableSubsegments: TaxSubsegment[];
  // Atributos dinámicos del subsegmento seleccionado
  dynamicAttributes: TaxAttribute[];
  // Acciones
  selectVertical: (verticalId: number | null) => void;
  selectSegment: (segmentId: number | null) => void;
  selectSubsegment: (subsegmentId: number | null) => void;
  reset: () => void;
  // Helpers
  selectedVertical: TaxVertical | null;
  selectedSegment: TaxSegment | null;
  selectedSubsegment: TaxSubsegment | null;
}

export function useTaxonomy(initialSelection?: Partial<TaxonomySelection>): UseTaxonomyReturn {
  const [tree, setTree] = useState<TaxonomyTree>(TAXONOMY_FALLBACK);
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState<TaxonomySelection>({
    verticalId: initialSelection?.verticalId ?? null,
    segmentId: initialSelection?.segmentId ?? null,
    subsegmentId: initialSelection?.subsegmentId ?? null,
  });
  const [dynamicAttributes, setDynamicAttributes] = useState<TaxAttribute[]>([]);

  // Cargar árbol desde el Brain (con fallback al estático)
  useEffect(() => {
    const loadTree = async () => {
      setIsLoading(true);
      try {
        const brainTree = await brainTaxonomy.getTree();
        if (brainTree.verticals.length > 0) {
          setTree(brainTree);
        }
      } catch {
        // Usar fallback silenciosamente
      } finally {
        setIsLoading(false);
      }
    };
    loadTree();
  }, []);

  // Cargar atributos dinámicos cuando cambia el subsegmento
  useEffect(() => {
    if (!selection.subsegmentId) {
      setDynamicAttributes([]);
      return;
    }

    const loadAttributes = async () => {
      // Primero intentar desde el Brain
      try {
        const attrs = await brainTaxonomy.getAttributesBySubsegment(selection.subsegmentId!);
        const allAttrs = [...(attrs.global ?? []), ...(attrs.specialized ?? [])];
        if (allAttrs.length > 0) {
          setDynamicAttributes(allAttrs);
          return;
        }
      } catch {
        // Fallback al estático
      }

      // Fallback: atributos estáticos
      const fallbackAttrs = DYNAMIC_FILTER_ATTRIBUTES[selection.subsegmentId!] ?? [];
      setDynamicAttributes(fallbackAttrs);
    };

    loadAttributes();
  }, [selection.subsegmentId]);

  // Derivar opciones disponibles en cascada
  const availableVerticals = tree.verticals.filter(v => v.activo !== false);

  const availableSegments = selection.verticalId
    ? (tree.verticals.find(v => v.id === selection.verticalId)?.segments ?? []).filter(s => s.activo !== false)
    : [];

  const availableSubsegments = selection.segmentId
    ? (availableSegments.find(s => s.id === selection.segmentId)?.subsegments ?? []).filter(ss => ss.activo !== false)
    : [];

  // Selección de entidades actuales
  const selectedVertical = availableVerticals.find(v => v.id === selection.verticalId) ?? null;
  const selectedSegment = availableSegments.find(s => s.id === selection.segmentId) ?? null;
  const selectedSubsegment = availableSubsegments.find(ss => ss.id === selection.subsegmentId) ?? null;

  // Acciones
  const selectVertical = useCallback((verticalId: number | null) => {
    setSelection({ verticalId, segmentId: null, subsegmentId: null });
    setDynamicAttributes([]);
  }, []);

  const selectSegment = useCallback((segmentId: number | null) => {
    setSelection(prev => ({ ...prev, segmentId, subsegmentId: null }));
    setDynamicAttributes([]);
  }, []);

  const selectSubsegment = useCallback((subsegmentId: number | null) => {
    setSelection(prev => ({ ...prev, subsegmentId }));
  }, []);

  const reset = useCallback(() => {
    setSelection({ verticalId: null, segmentId: null, subsegmentId: null });
    setDynamicAttributes([]);
  }, []);

  return {
    tree,
    isLoading,
    selection,
    availableVerticals,
    availableSegments,
    availableSubsegments,
    dynamicAttributes,
    selectVertical,
    selectSegment,
    selectSubsegment,
    reset,
    selectedVertical,
    selectedSegment,
    selectedSubsegment,
  };
}
