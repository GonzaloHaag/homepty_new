/**
 * brain-client.ts
 * Cliente HTTP para el Brain API (homepty-brain-v1)
 *
 * Expone las funciones de taxonomía del Brain:
 * - getTree(): árbol completo Vertical > Segmento > Subsegmento
 * - getAttributesBySubsegment(id): atributos globales + especializados
 *
 * Configuración:
 * - NEXT_PUBLIC_BRAIN_URL: URL base del Brain (ej: https://brain.homepty.com)
 * - Si no está configurada, las funciones lanzan error y el hook usa el fallback estático.
 */

// ============================================================
// TIPOS
// ============================================================

export interface TaxVertical {
  id: number;
  nombre: string;
  descripcion: string | null;
  icono: string | null;
  activo: boolean;
  segments: TaxSegment[];
}

export interface TaxSegment {
  id: number;
  verticalId: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  subsegments: TaxSubsegment[];
}

export interface TaxSubsegment {
  id: number;
  segmentId: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
}

export interface TaxAttribute {
  id: number;
  nombre: string;
  clave: string;
  tipoDato: "integer" | "decimal" | "boolean" | "enum" | "text";
  opcionesEnum: string[] | null;
  esGlobal: boolean;
  subsegmentId: number | null;
  requerido: boolean;
  unidad: string | null;
  orden: number;
}

export interface TaxonomyTree {
  verticals: TaxVertical[];
}

export interface AttributesBySubsegment {
  global: TaxAttribute[];
  specialized: TaxAttribute[];
}

// ============================================================
// CLIENTE
// ============================================================

const BRAIN_URL = process.env.NEXT_PUBLIC_BRAIN_URL;

async function brainFetch<T>(path: string): Promise<T> {
  if (!BRAIN_URL) {
    throw new Error("NEXT_PUBLIC_BRAIN_URL no está configurada");
  }

  const response = await fetch(`${BRAIN_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    // Cache de 5 minutos para el árbol taxonómico (cambia raramente)
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Brain API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.result?.data ?? data;
}

export const brainTaxonomy = {
  /**
   * Obtiene el árbol taxonómico completo: Vertical > Segmento > Subsegmento
   */
  async getTree(): Promise<TaxonomyTree> {
    return brainFetch<TaxonomyTree>("/api/taxonomy/tree");
  },

  /**
   * Obtiene los atributos (globales + especializados) para un subsegmento
   */
  async getAttributesBySubsegment(subsegmentId: number): Promise<AttributesBySubsegment> {
    return brainFetch<AttributesBySubsegment>(
      `/api/taxonomy/attributes/subsegment/${subsegmentId}`
    );
  },

  /**
   * Obtiene todas las verticales (sin árbol completo)
   */
  async getVerticals(): Promise<TaxVertical[]> {
    const data = await brainFetch<{ verticals: TaxVertical[] }>("/api/taxonomy/verticals");
    return data.verticals;
  },
};
