"use client";

import { Property } from "@/types";
import { usePropertyValuation } from "@/hooks/use-property-valuation";
import { Loader2 } from "lucide-react";

interface Props {
    property: Property;
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
    }).format(value);
}

export function PropertySidebar({ property }: Props) {
    const { data: valuation, isLoading, error } = usePropertyValuation({
        direccion: property.direccion,
        tipo_inmueble: 2,
        superficie: property.area_construida || property.area,
        enabled: !!property.direccion,
    });

    const precioM2 = property.area_construida > 0
        ? property.precio / property.area_construida
        : null;

    return (
        <div className="flex flex-col gap-4">
            {/* Credit Simulation */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Simulación de Crédito</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Precio</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(property.precio)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Enganche (20%)</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(property.precio * 0.2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Financiamiento</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(property.precio * 0.8)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-2 flex justify-between text-xs">
                        <span className="text-gray-500">Mensualidad est. (20 años)</span>
                        <span className="font-bold text-primary">
                            {formatCurrency((property.precio * 0.8 * 0.01) / (1 - Math.pow(1.01, -240)))}
                        </span>
                    </div>
                </div>
            </div>

            {/* Valuation / Price Analysis */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Análisis de Precio</h3>

                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <span className="ml-2 text-xs text-gray-400">Obteniendo valuación...</span>
                    </div>
                ) : error ? (
                    <div className="space-y-2">
                        {/* Fallback to basic calculation */}
                        {precioM2 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Precio por m²</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(precioM2)}</span>
                            </div>
                        )}
                        <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-2">
                            ⚠️ Valuación automática no disponible: {error}
                        </p>
                    </div>
                ) : valuation ? (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Valor estimado</span>
                            <span className="font-bold text-primary">
                                {valuation.valor_promedio ? formatCurrency(valuation.valor_promedio) : "—"}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Precio por m²</span>
                            <span className="font-semibold text-gray-900">
                                {valuation.valor_promedio_m2 ? formatCurrency(valuation.valor_promedio_m2) : precioM2 ? formatCurrency(precioM2) : "—"}
                            </span>
                        </div>
                        {valuation.valor_promedio && (
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Diferencia</span>
                                {(() => {
                                    const diff = ((property.precio - valuation.valor_promedio) / valuation.valor_promedio) * 100;
                                    const isOverpriced = diff > 0;
                                    return (
                                        <span className={`font-semibold ${isOverpriced ? "text-red-500" : "text-green-500"}`}>
                                            {isOverpriced ? "+" : ""}{diff.toFixed(1)}%
                                        </span>
                                    );
                                })()}
                            </div>
                        )}
                        {valuation.inmuebles && valuation.inmuebles.length > 0 && (
                            <div className="border-t border-gray-100 pt-2 mt-2">
                                <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">
                                    {valuation.inmuebles.length} comparables encontrados
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {precioM2 && (
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Precio por m²</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(precioM2)}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Investment Analysis */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Análisis de Inversión</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ROI estimado</span>
                        <span className="font-semibold text-gray-900">—</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Plusvalía zona</span>
                        <span className="font-semibold text-gray-900">—</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                        Los datos de inversión se calculan con datos de mercado en tiempo real.
                    </p>
                </div>
            </div>
        </div>
    );
}
