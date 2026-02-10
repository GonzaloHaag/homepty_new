/**
 * Cliente tRPC para conectar app.homepty.com con Homepty Brain
 * 
 * Este cliente permite a la suite principal consumir análisis avanzados
 * directamente desde Homepty Brain.
 */

import { createTRPCClient, httpBatchLink } from "@trpc/client";

const BRAIN_API_URL = process.env.NEXT_PUBLIC_BRAIN_API_URL || "http://localhost:3001/trpc";

/**
 * Cliente tRPC para Homepty Brain
 */
export const brainClient = createTRPCClient<any>({
  links: [
    httpBatchLink({
      url: BRAIN_API_URL,
      headers() {
        return {
          "Content-Type": "application/json",
        };
      },
    }),
  ],
});

/**
 * Interfaces de tipos para las respuestas del Brain
 */

export interface PropertyValuation {
  propertyId: number;
  estimatedPrice: number;
  confidence: number;
  priceRange: {
    min: number;
    max: number;
  };
  factors: {
    location: number;
    size: number;
    amenities: number;
    market: number;
  };
  comparables: Array<{
    id: number;
    price: number;
    similarity: number;
  }>;
}

export interface ProfitabilityAnalysis {
  propertyId: number;
  purchasePrice: number;
  estimatedRentalIncome: number;
  monthlyExpenses: number;
  annualROI: number;
  capRate: number;
  cashFlow: number;
  breakEvenYears: number;
  appreciation: {
    year1: number;
    year3: number;
    year5: number;
  };
  recommendation: "excellent" | "good" | "fair" | "poor";
  insights: string[];
}

export interface MarketTrends {
  area: string;
  averagePrice: number;
  pricePerSqm: number;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
  demandLevel: "high" | "medium" | "low";
  supplyLevel: "high" | "medium" | "low";
  bestTimeToSell: string;
  recommendations: string[];
}

/**
 * Funciones helper para consumir el Brain
 */

/**
 * Obtiene la valuación estimada de una propiedad
 */
export async function getPropertyValuation(
  propertyData: {
    area: number;
    habitaciones: number;
    banios: number;
    id_estado: number;
    id_ciudad: number;
    tipo: string;
    amenidades?: string[];
  }
): Promise<PropertyValuation | null> {
  try {
    const result = await brainClient.ml.predictPrice.query(propertyData);
    return result as PropertyValuation;
  } catch (error) {
    console.error("Error al obtener valuación del Brain:", error);
    return null;
  }
}

/**
 * Obtiene análisis de rentabilidad para una propiedad de inversión
 */
export async function getProfitabilityAnalysis(
  propertyData: {
    precio: number;
    area: number;
    tipo: string;
    id_ciudad: number;
    habitaciones: number;
    amenidades?: string[];
  }
): Promise<ProfitabilityAnalysis | null> {
  try {
    const result = await brainClient.financial.profitabilityAnalysis.query(propertyData);
    return result as ProfitabilityAnalysis;
  } catch (error) {
    console.error("Error al obtener análisis de rentabilidad del Brain:", error);
    return null;
  }
}

/**
 * Obtiene tendencias del mercado para una zona específica
 */
export async function getMarketTrends(
  location: {
    id_estado: number;
    id_ciudad: number;
    colonia?: string;
  }
): Promise<MarketTrends | null> {
  try {
    const result = await brainClient.analysis.marketTrends.query(location);
    return result as MarketTrends;
  } catch (error) {
    console.error("Error al obtener tendencias de mercado del Brain:", error);
    return null;
  }
}

/**
 * Obtiene recomendaciones de precio para una propiedad
 */
export async function getPriceRecommendation(
  propertyData: {
    area: number;
    habitaciones: number;
    banios: number;
    id_estado: number;
    id_ciudad: number;
    tipo: string;
    precio_actual?: number;
  }
): Promise<{
  recommendedPrice: number;
  confidence: number;
  reasoning: string[];
} | null> {
  try {
    const result = await brainClient.ai.recommendPrice.query(propertyData);
    return result;
  } catch (error) {
    console.error("Error al obtener recomendación de precio del Brain:", error);
    return null;
  }
}
