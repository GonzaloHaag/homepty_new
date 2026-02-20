"use client";

import {
    BarChartIcon,
    XIcon,
    SparklesIcon,
    HomeIcon,
    DollarSignIcon,
    TrendingUpIcon,
    Building2Icon,
    TargetIcon,
    DatabaseIcon,
    CheckCircle2Icon,
    BarChart3Icon,
} from "lucide-react";

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

interface ProfitabilityAnalysisPanelProps {
    onClose?: () => void;
}

export function ProfitabilityAnalysisPanel({ onClose }: ProfitabilityAnalysisPanelProps) {
    const { locationAnalytics, strategicRecommendations } = testData;

    return (
        <aside className="flex flex-col h-full bg-[#F3F4F6] border-l border-gray-200 overflow-hidden rounded-[24px]">
            {/* HEADER */}
            <div className="p-6 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart3Icon className="text-primary w-6 h-6" />
                    <h2 className="font-bold text-lg">Análisis de Rentabilidad</h2>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>

            {/* CONTENIDO SCROLL */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar space-y-8">
                {/* INPUT IA CON GLOW */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-400 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm"></div>
                    <div className="relative bg-white border border-gray-100 rounded-xl p-1 flex items-center">
                        <input
                            className="w-full border-none focus:ring-0 text-sm px-3 py-2 bg-transparent text-gray-700 outline-none"
                            placeholder="Investiga con IA, ingresa el nicho..."
                            type="text"
                        />
                        <button className="bg-primary text-white p-2 rounded-lg hover:bg-blue-600 transition-all shadow-md shadow-primary/20">
                            <SparklesIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* ÁREAS CLAVE */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900">Áreas Clave de Análisis</h3>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-bold">
                            Mercado 2
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* CARD 1 - Residencial */}
                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 text-primary">
                                <HomeIcon className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-wide">
                                    Mercado Residencial
                                </span>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <DollarSignIcon className="text-green-500 w-5 h-5 shrink-0" />
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-800">Precios por m²</p>
                                        <p className="text-[10px] text-gray-500">
                                            Segmentación por zonas ({locationAnalytics.location}): {locationAnalytics.marketData.residentialPricing}.
                                        </p>
                                    </div>
                                </li>

                                <li className="flex gap-3">
                                    <TrendingUpIcon className="text-orange-500 w-5 h-5 shrink-0" />
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-800">Demanda vs. Oferta</p>
                                        <p className="text-[10px] text-gray-500">
                                            Inventarios activos bajos ({locationAnalytics.marketData.demandLevel} absorción) y tiempo reducido.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* CARD 2 - Turístico */}
                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 text-purple-600">
                                <Building2Icon className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-wide">
                                    Mercado Vacacional/Turístico
                                </span>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <BarChartIcon className="text-blue-500 w-5 h-5 shrink-0" />
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-800">Rendimiento Airbnb</p>
                                        <p className="text-[10px] text-gray-500">
                                            Impacto del turismo ({locationAnalytics.marketData.tourismImpact}) en destinos como {locationAnalytics.location}.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* OPORTUNIDADES */}
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TargetIcon className="text-primary w-5 h-5 shrink-0" />
                        Identificación de Oportunidades
                    </h3>

                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 space-y-4">
                        <div className="flex gap-3">
                            <BarChart3Icon className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                            <div className="text-[11px]">
                                <span className="font-bold text-gray-800">Análisis:</span> Clusterización de
                                municipios con alto crecimiento poblacional.
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <DatabaseIcon className="text-primary w-4 h-4 shrink-0 mt-0.5" />
                            <div className="text-[11px]">
                                <span className="font-bold text-gray-800">Data:</span> Cruce de registros y
                                permisos 2024.
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <CheckCircle2Icon className="text-green-600 w-4 h-4 shrink-0 mt-0.5" />
                            <div className="text-[11px]">
                                <span className="font-bold text-gray-800">Resultado:</span> Recomendar
                                desarrollo de vivienda media en zonas de {locationAnalytics.location}.
                            </div>
                        </div>
                    </div>
                </div>

                {/* RECOMENDACIÓN FINAL */}
                <div className="pb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900">
                            Recomendaciones Estratégicas
                        </h3>
                        {strategicRecommendations.isAdvanced && (
                            <span className="text-[9px] px-2 py-0.5 bg-orange-100 text-orange-700 rounded-lg font-bold">
                                Personalizadas
                            </span>
                        )}
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-4 text-white">
                        <p className="text-[11px] text-gray-300 leading-relaxed mb-4 italic">
                            "{strategicRecommendations.context} - {strategicRecommendations.forDevelopers.replace("⭐", "").trim()}"
                        </p>

                        <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-xl transition-all border border-white/20">
                            Descargar Reporte Completo PDF
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
