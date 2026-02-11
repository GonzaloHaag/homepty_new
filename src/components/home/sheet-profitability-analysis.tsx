"use client";

import {
  BarChartIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CompassIcon,
  DatabaseIcon,
  DollarSignIcon,
  LayersIcon,
  RefreshCwIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

const testData = {
  locationAnalytics: {
    location: "CDMX",
    marketData: {
      residentialPricing: "Polanco: $50,000 MXN/m², Iztapalapa: $20,000 MXN/m²",
      demandLevel: "Alto",
      tourismImpact: "Moderado",
      nearshoring: "Bajo",
    },
  },
  selectedMarkets: ["Residencial", "Turístico"],
  marketOptions: ["Residencial", "Turístico", "Industrial", "Comercial"],
  selectedSegments: ["Vivienda Media", "Turismo de Lujo"],
  segmentOptions: [
    "Vivienda Media",
    "Vivienda de Lujo",
    "Turismo de Lujo",
    "Logística",
  ],
  strategicRecommendations: {
    context:
      "Análisis de mercado inmobiliario en CDMX, basado en datos de INEGI y tendencias 2025",
    forDevelopers:
      "⭐ Invertir en vivienda media en zonas de crecimiento como Azcapotzalco. Considerar desarrollos mixtos.",
    forInvestors:
      "⭐ Explorar propiedades vacacionales en destinos emergentes como Valle de Guadalupe con alto ROI en Airbnb.",
    forGovernment:
      "Fomentar incentivos fiscales para desarrollos sostenibles en zonas industriales de baja densidad.",
    isAdvanced: true,
  },
  lastUpdated: new Date("2025-08-15T10:00:00"),
};

interface SheetProfitabilityAnalysisProps {
  trigger?: React.ReactNode;
}

export function SheetProfitabilityAnalysis({ trigger }: SheetProfitabilityAnalysisProps) {
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(
    testData.selectedMarkets
  );
  const [selectedSegments, setSelectedSegments] = useState<string[]>(
    testData.selectedSegments
  );

  const handleMarketChange = (market: string, checked: boolean) => {
    setSelectedMarkets((prev) =>
      checked ? [...prev, market] : prev.filter((m) => m !== market)
    );
  };

  const handleSegmentChange = (segment: string, checked: boolean) => {
    setSelectedSegments((prev) =>
      checked ? [...prev, segment] : prev.filter((s) => s !== segment)
    );
  };

  const { locationAnalytics, marketOptions, segmentOptions, strategicRecommendations, lastUpdated } = testData;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button type="button" variant="default" size="lg" title="Rentabilidad">
            <TargetIcon /> Análisis de rentabilidad
          </Button>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-md overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-x-2">
            <BarChartIcon /> Análisis de rentabilidad
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-y-2">
          {/* Barra de consulta IA */}
          <div className="flex items-center gap-2 p-4">
            <Input
              type="text"
              placeholder="Investiga con IA, ingresa el nicho de tu cliente y nosotros lo buscamos"
              className="flex-grow border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
            <Button size="sm" className="px-3 bg-blue-600 hover:bg-blue-700 text-white">
              <SparklesIcon size={16} />
            </Button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            {/* Mensaje informativo sobre la fuente de datos */}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded p-3 mb-4 flex items-start gap-2">
              <CompassIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                Los análisis y recomendaciones se basan en los filtros aplicados
                y la ubicación buscada ({locationAnalytics.location}). Selecciona
                mercados y segmentos para refinar.
              </span>
            </div>

            <div className="space-y-6">
              {/* 1. Áreas Clave de Análisis con Filtro */}
              <section>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                  <h4 className="text-md font-semibold flex items-center">
                    <LayersIcon className="h-4 w-4 text-blue-500 mr-2" />
                    Áreas Clave de Análisis
                  </h4>

                  {/* Filtro Mercado */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2 gap-1">
                        <SlidersHorizontalIcon className="h-3 w-3" />
                        Mercado
                        {selectedMarkets.length > 0 && (
                          <span className="ml-1 bg-blue-100 text-blue-600 rounded-full px-1.5 text-[10px] font-bold">
                            {selectedMarkets.length}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrar por Mercado</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {marketOptions.map((market) => (
                        <DropdownMenuCheckboxItem
                          key={market}
                          checked={selectedMarkets.includes(market)}
                          onCheckedChange={(checked) => handleMarketChange(market, !!checked)}
                        >
                          {market}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => setSelectedMarkets([])} className="text-xs text-red-600">
                        Limpiar Selección
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4">
                  {/* Mercado Residencial */}
                  {(selectedMarkets.length === 0 || selectedMarkets.includes("Residencial")) && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium mb-2 text-gray-800">Mercado Residencial</h5>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <DollarSignIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Precios por m²:</strong> Segmentación por zonas ({locationAnalytics.location}: {locationAnalytics.marketData.residentialPricing}).
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <ClockIcon className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Demanda vs. Oferta:</strong> Inventarios activos ({locationAnalytics.marketData.demandLevel}) y tiempo de venta/renta.
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <TrendingUpIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Factores de Valorización:</strong> Proximidad a transporte, seguridad, servicios.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mercado Turístico */}
                  {(selectedMarkets.length === 0 || selectedMarkets.includes("Turístico")) && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium mb-2 text-gray-800">Mercado Vacacional/Turístico</h5>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <BarChartIcon className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Rendimiento de Airbnb:</strong> Occupancy rates y ROI en destinos como {locationAnalytics.location}.
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <ClockIcon className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Impacto del Turismo:</strong> Correlación entre llegadas ({locationAnalytics.marketData.tourismImpact}) y precios.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mercado Industrial */}
                  {(selectedMarkets.length === 0 || selectedMarkets.includes("Industrial")) && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <h5 className="font-medium mb-2 text-gray-800">Mercado Industrial y Logístico</h5>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <BriefcaseIcon className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Nearshoring:</strong> Análisis de clusters industriales ({locationAnalytics.marketData.nearshoring}) en {locationAnalytics.location}.
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <DollarSignIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Precios de Bodegas:</strong> Relación con rutas de transporte y tratados comerciales.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Identificación de Oportunidades de Inversión */}
              <section>
                <h4 className="text-md font-semibold flex items-center border-b border-gray-200 pb-2 mb-3">
                  <CompassIcon className="h-4 w-4 text-blue-500 mr-2" />
                  Identificación de Oportunidades en {locationAnalytics.location}
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <TrendingUpIcon className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Análisis:</strong> Clusterización de municipios con alto crecimiento poblacional y baja oferta de vivienda.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <DatabaseIcon className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Data:</strong> Censo de Población (INEGI) + registros de permisos de construcción.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Resultado:</strong> Recomendar desarrollo de vivienda media en zonas como {locationAnalytics.location}.
                    </span>
                  </div>
                </div>
              </section>

              {/* Recomendaciones Estratégicas */}
              <section>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                  <h4 className="text-md font-semibold flex items-center">
                    <TrendingUpIcon className="h-4 w-4 text-blue-500 mr-2" />
                    Recomendaciones Estratégicas
                    {strategicRecommendations.isAdvanced && (
                      <span className="ml-2 text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        Personalizadas
                      </span>
                    )}
                  </h4>

                  {/* Filtro Segmento */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2 gap-1">
                        <BriefcaseIcon className="h-3 w-3" />
                        Segmento
                        {selectedSegments.length > 0 && (
                          <span className="ml-1 bg-blue-100 text-blue-600 rounded-full px-1.5 text-[10px] font-bold">
                            {selectedSegments.length}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrar por Segmento</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {segmentOptions.map((segment) => (
                        <DropdownMenuCheckboxItem
                          key={segment}
                          checked={selectedSegments.includes(segment)}
                          onCheckedChange={(checked) => handleSegmentChange(segment, !!checked)}
                        >
                          {segment}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => setSelectedSegments([])} className="text-xs text-red-600">
                        Limpiar Selección
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Lista de recomendaciones */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 italic mb-4">
                    Recomendaciones basadas en: {strategicRecommendations.context}
                  </p>

                  {[
                    { color: "blue", title: "Para Desarrolladores", content: strategicRecommendations.forDevelopers },
                    { color: "green", title: "Para Inversionistas", content: strategicRecommendations.forInvestors },
                    { color: "purple", title: "Para Gobierno", content: strategicRecommendations.forGovernment },
                  ].map((item) => (
                    <div className="flex items-start" key={item.title}>
                      <div className={`w-1 h-auto bg-${item.color}-500 rounded-full mr-3 mt-1 flex-shrink-0 self-stretch`}></div>
                      <div className="text-sm">
                        <strong className={`text-${item.color}-600 block mb-1`}>{item.title}:</strong>
                        <span className="text-gray-700">{item.content.replace("⭐", "⭐")}</span>
                      </div>
                    </div>
                  ))}

                  {/* Fecha de Actualización */}
                  <div className="mt-5 pt-3 border-t border-gray-200 flex items-center text-xs text-gray-500">
                    <RefreshCwIcon className="h-3 w-3 mr-1.5 text-gray-400" /> Actualizado:{" "}
                    {lastUpdated.toLocaleDateString("es-ES", { day: "numeric", month: "numeric", year: "numeric" })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
