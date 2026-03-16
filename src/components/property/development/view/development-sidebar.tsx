"use client";

import { Property } from "@/types";
import { MapPinIcon, MailIcon, PhoneIcon, CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
import { STATES_NAMES_BY_ID } from "@/utils/formatters";
import type { PropertyOwner } from "../../view/property-owner-card";
import { DevelopmentTab } from "./development-view-layout";

interface Props {
    property: Property;
    owner: PropertyOwner | null;
    activeTab: DevelopmentTab;
}

export function DevelopmentSidebar({ property, owner, activeTab }: Props) {
    const ownerLocation = owner?.id_estado ? STATES_NAMES_BY_ID[owner.id_estado] : null;

    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            {/* ── Tarjeta de Propietario / Agente ─────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-4 pt-4 pb-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Agente / Desarrollador</h3>
                </div>
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                                <Image
                                    src={owner?.imagen_perfil_usuario ?? "/images/placeholder.svg"}
                                    alt={owner?.nombre_usuario ?? "Agente"}
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-slate-100">
                                <CheckCircle2Icon size={12} className="text-primary fill-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">
                                {owner?.nombre_usuario ?? "Agente Homepty"}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                                {owner?.actividad_usuario ?? "Desarrollador Inmobiliario"}
                            </p>
                            {ownerLocation && (
                                <div className="flex items-center gap-1 mt-0.5">
                                    <MapPinIcon size={10} className="text-slate-300 shrink-0" />
                                    <span className="text-[10px] text-slate-400">{ownerLocation}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-1.5 mb-3">
                        {owner?.email_usuario && (
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                <MailIcon size={12} className="text-slate-300 shrink-0" />
                                <a href={`mailto:${owner.email_usuario}`} className="hover:text-primary transition-colors truncate">
                                    {owner.email_usuario}
                                </a>
                            </div>
                        )}
                        {owner?.telefono_usuario && (
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                <PhoneIcon size={12} className="text-slate-300 shrink-0" />
                                <a href={`tel:${owner.telefono_usuario}`} className="hover:text-primary transition-colors">
                                    {owner.telefono_usuario}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-2">
                         <a
                             href={owner?.email_usuario ? `mailto:${owner.email_usuario}?subject=Consulta sobre desarrollo ${property.nombre}` : "#"}
                             className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors text-center shadow-sm"
                         >
                             Contactar
                         </a>
                         <a
                             href={owner?.telefono_usuario ? `tel:${owner.telefono_usuario}` : "#"}
                             className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors text-center shadow-sm"
                         >
                             Mensaje
                         </a>
                    </div>
                </div>
            </div>

            {/* Content varies depending on the activeTab in the main layout */}
            {activeTab === "overview" && (
                <>
                    {/* Plusvalia */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h3 className="text-sm font-bold text-slate-800 mb-3">Plusvalía Estimada</h3>
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-black text-emerald-600">+12%</span>
                            <span className="text-xs text-slate-500 font-medium mb-1">Anual promedio</span>
                        </div>
                    </div>

                    {/* Key Performance Indicators */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                            Key Performance
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 flex items-center gap-2">
                                    Occupancy
                                </span>
                                <span className="font-bold text-slate-900">94.2%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 flex items-center gap-2">
                                    Net Cashflow
                                </span>
                                <span className="font-bold text-emerald-600">+$24.5k</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 flex items-center gap-2">
                                    Break-even
                                </span>
                                <span className="font-bold text-slate-900">3.2 yrs</span>
                            </div>
                        </div>
                    </div>

                    {/* Projections */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                            2027 Projections
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-600 font-medium">Optimistic</span>
                                    <span className="font-bold text-primary">+22%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-600 font-medium">Moderate</span>
                                    <span className="font-bold text-slate-500">+14%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 rounded-full transition-all" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-600 font-medium">Conservative</span>
                                    <span className="font-bold text-slate-500">+6%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-300 rounded-full transition-all" style={{ width: '35%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl transition-colors shadow-md mt-2">
                         Full Financial Report
                    </button>
                </>
            )}

            {activeTab === "units" && (
                <>
                    {/* ROI Estimado */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Projected Annual ROI</h3>
                        <div className="flex items-end justify-between mb-3">
                            <span className="text-4xl font-black text-slate-900">18.4%</span>
                            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mb-1">+2.1% ↑</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
                             <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest text-center font-semibold">
                            Benchmark: 12.0%
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                            Precio de Renta Proyectado
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col items-center">
                                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                    Mensual (Largo Plazo)
                                </span>
                                <span className="text-lg font-bold text-slate-800">
                                    $24,000 <span className="text-[10px] font-semibold text-slate-400">MXN</span>
                                </span>
                            </div>
                            <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-lg flex flex-col items-center">
                                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                                    Short Rent (Airbnb)
                                </span>
                                <span className="text-lg font-bold text-emerald-700">
                                    $45,000 <span className="text-[10px] font-semibold text-emerald-500">MXN</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
