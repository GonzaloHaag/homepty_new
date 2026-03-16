"use client";

import { PropertyWithImages, PropertyWithImagesAndAmenities } from "@/types";
import { formatMoney } from "@/utils/formatters";
import {
    ArrowLeftIcon,
    BedIcon,
    BathIcon,
    DockIcon,
    MapPinIcon,
    ScalingIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    SquareIcon,
    HomeIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppShell } from "@/hooks";
import { MapLocation } from "../../map-location";
import { useState } from "react";
import type { PropertyOwner } from "../../view/property-owner-card";
import { DevelopmentTab } from "./development-view-layout";
import { UnitCard } from "./unit-card";

interface Props {
    property: PropertyWithImagesAndAmenities;
    owner: PropertyOwner | null;
    units: PropertyWithImages[];
    activeTab: DevelopmentTab;
    setActiveTab: (tab: DevelopmentTab) => void;
}

export function DevelopmentContent({ property, owner, units, activeTab, setActiveTab }: Props) {
    const { isRightCollapsed, setIsRightCollapsed } = useAppShell();
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [showEBJson, setShowEBJson] = useState(false);

    const images = property.imagenes_propiedades ?? [];
    const mainImage =
        images.length > 0
            ? images[currentImageIdx]?.image_url
            : "/images/placeholder.svg";

    const operationType =
        property.accionespropiedades?.nombre_accion_propiedad || "Venta";

    const ciudadNombre = (property as unknown as Record<string, string>)["ciudad_nombre"] ?? "";
    const estadoNombre = (property as unknown as Record<string, string>)["estado_nombre"] ?? "";
    const addressLine = [property.direccion, ciudadNombre, estadoNombre]
        .filter(Boolean)
        .join(", ");
    const locationShort = [ciudadNombre, estadoNombre].filter(Boolean).join(", ");

    const prevImage = () =>
        setCurrentImageIdx((i) => (i === 0 ? images.length - 1 : i - 1));
    const nextImage = () =>
        setCurrentImageIdx((i) => (i === images.length - 1 ? 0 : i + 1));

    const ebDataRaw = (property as unknown as Record<string, unknown>)["easybroker_source_data"];
    const ebDataStr: string | null = ebDataRaw ? JSON.stringify(ebDataRaw, null, 2) : null;

    // Group units by type
    const unitsByType = units.reduce((acc, unit) => {
        const type = unit.tipo || "Otros";
        if (!acc[type]) acc[type] = [];
        acc[type].push(unit);
        return acc;
    }, {} as Record<string, PropertyWithImages[]>);
    
    // Manage sub-tabs for units (e.g., Departamentos, Oficinas)
    const unitTypes = Object.keys(unitsByType);
    const [activeUnitType, setActiveUnitType] = useState<string>(unitTypes[0] || "");

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide h-full bg-white relative">
            {/* Sticky Header */}
            <header className="sticky top-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link
                        href="/explore"
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <ArrowLeftIcon size={20} />
                    </Link>
                    <h1 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        {property.nombre}
                    </h1>
                </div>
                
                {/* View Mode Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                            activeTab === "overview" 
                                ? "bg-white text-slate-800 shadow-sm" 
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("units")}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                            activeTab === "units" 
                                ? "bg-white text-slate-800 shadow-sm" 
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        Units
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsRightCollapsed(!isRightCollapsed)}
                        className={`p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors ${!isRightCollapsed ? "text-primary bg-blue-50" : ""}`}
                        title="Toggle Sidebar"
                    >
                        <DockIcon size={20} className="rotate-90" />
                    </button>
                </div>
            </header>

            {/* ── Galería de fotos ─────────────────────────────────── */}
            <div className="w-full h-[420px] relative bg-slate-900 flex">
                {/* Main image */}
                <div className="w-full lg:w-3/4 relative h-full">
                    {mainImage && (
                        <Image
                            src={mainImage}
                            alt={property.nombre}
                            fill
                            className="object-cover"
                            priority
                            unoptimized={mainImage.includes("assets.easybroker.com")}
                        />
                    )}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                            >
                                <ChevronLeftIcon size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                            >
                                <ChevronRightIcon size={20} />
                            </button>
                        </>
                    )}
                </div>

                {/* Side grid (Mocked based on image 1 context to show more images statically if present) */}
                <div className="hidden lg:flex flex-col w-1/4 h-full pl-2 gap-2 pr-2 py-2">
                     {images.slice(1, 3).map((img, i) => (
                         <div key={`side-img-${i}`} className="relative h-1/3 w-full rounded-md overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                            <Image
                                src={img.image_url}
                                alt={`Foto ${i + 2}`}
                                fill
                                className="object-cover"
                                unoptimized={img.image_url.includes("assets.easybroker.com")}
                            />
                         </div>
                     ))}
                     {images.length > 3 && (
                        <div className="relative h-1/3 w-full rounded-md overflow-hidden bg-slate-800 flex items-center justify-center cursor-pointer group">
                             {images[3] && (
                                <Image
                                    src={images[3].image_url}
                                    alt="Más fotos"
                                    fill
                                    className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                                    unoptimized={images[3].image_url.includes("assets.easybroker.com")}
                                />
                            )}
                            <div className="relative z-10 text-white font-bold text-2xl flex items-center gap-1">
                                +{images.length - 3}
                            </div>
                        </div>
                     )}
                </div>
            </div>

            <div className="px-8 py-8 max-w-5xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                Desarrollo
                            </span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase border border-slate-200">
                                {property.tipo}
                            </span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase border border-slate-200">
                                {operationType}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            {property.nombre}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <MapPinIcon className="text-primary shrink-0" size={16} />
                            <span>{addressLine || "Dirección no disponible"}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area based on Tab */}
                {activeTab === "overview" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* High-level Overview Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    Puntuación de inversión
                                </h4>
                                <div className="text-3xl font-bold text-slate-800">89</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                    Tasa de Capitalización
                                </h4>
                                <div className="text-3xl font-bold text-slate-800">8.5<span className="text-sm font-semibold text-slate-500">%</span></div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                    Gross Square Footage
                                </h4>
                                <div className="text-2xl font-bold text-slate-800">
                                    {Intl.NumberFormat('en-US').format(property.area_construida || 0)} <span className="text-sm font-semibold text-slate-500">m²</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-center">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                    Año de Construcción
                                </h4>
                                <div className="text-2xl font-bold text-slate-800">
                                    {/* Mocking the build year since it's not strictly available yet */}
                                    2025
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Property Summary</h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                                {property.descripcion || "No hay descripción disponible."}
                            </p>
                        </div>

                        {/* Amenidades */}
                        <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Amenidades del Desarrollo</h3>
                            {property.amenidades_propiedades?.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-2">
                                    {property.amenidades_propiedades.map((a) => (
                                        <div key={Number(a.id_amenidad)} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                                            {String(a.id_amenidad)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 italic text-sm">
                                    No hay amenidades registradas para este desarrollo.
                                </p>
                            )}
                        </div>

                        {/* Location Map */}
                        <div className="mb-10">
                            <div className="flex flex-col gap-1 mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="text-primary" size={20} />
                                    <h3 className="text-lg font-bold text-slate-900">Ubicación y Entorno</h3>
                                </div>
                                <p className="text-slate-500 text-sm ml-7">
                                    {locationShort || property.direccion || "Ubicación no disponible"}
                                </p>
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-slate-200 h-[350px] relative bg-slate-100 mb-4">
                                <MapLocation />
                            </div>
                        </div>

                        {ebDataStr && (
                            <div className="mb-10 rounded-2xl border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => setShowEBJson((v) => !v)}
                                    className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Datos EasyBroker
                                        </span>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                                            RAW
                                        </span>
                                    </div>
                                    {showEBJson ? (
                                        <ChevronUpIcon size={16} className="text-slate-400" />
                                    ) : (
                                        <ChevronDownIcon size={16} className="text-slate-400" />
                                    )}
                                </button>
                                {showEBJson && (
                                    <pre className="p-5 text-xs text-slate-600 bg-white overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto">
                                        {ebDataStr}
                                    </pre>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "units" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {unitTypes.length > 0 ? (
                            <>
                                {/* Nested Tabs for Unit Types */}
                                <div className="flex gap-6 border-b border-slate-200 mb-6">
                                    {unitTypes.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setActiveUnitType(type)}
                                            className={`pb-3 text-sm font-bold transition-colors border-b-2 ${
                                                activeUnitType === type 
                                                    ? "text-primary border-primary" 
                                                    : "text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300"
                                            }`}
                                        >
                                            {type} ({unitsByType[type].length})
                                        </button>
                                    ))}
                                </div>

                                {/* Active Unit Type Content */}
                                <div className="mb-10 flex flex-col lg:flex-row gap-8">
                                    {/* Unidades List */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Modelos Disponibles</h3>
                                        <div className="flex flex-col gap-4">
                                            {unitsByType[activeUnitType]?.map(unit => (
                                                <UnitCard key={unit.id} unit={unit} />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="lg:w-80 shrink-0 self-start sticky top-24">
                                        {/* Mocked Development details specific for units view */}
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-4 shadow-sm">
                                            <h4 className="text-sm font-bold text-slate-800 mb-4">Plan de Pagos</h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                        <span className="font-semibold text-slate-700">Enganche</span>
                                                    </div>
                                                    <span className="font-bold">20%</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                        <span className="font-semibold text-slate-700">Durante const.</span>
                                                    </div>
                                                    <span className="font-bold">70%</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                                        <span className="font-semibold text-slate-700">A la entrega</span>
                                                    </div>
                                                    <span className="font-bold">10%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 shadow-sm">
                                            <h4 className="text-sm font-bold text-indigo-900 mb-1">Simulador de Crédito</h4>
                                            <p className="text-[10px] text-indigo-700 mb-4">Calcula tu hipoteca para las unidades de este desarrollo</p>
                                            
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-[11px] mb-1">
                                                        <span className="text-indigo-900/70 font-medium">Monto estimado</span>
                                                        <span className="font-bold text-indigo-900">$2,500,000</span>
                                                    </div>
                                                    <div className="h-1.5 bg-indigo-200/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500 w-full"></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-[11px] mb-1">
                                                        <span className="text-indigo-900/70 font-medium">Plazo</span>
                                                        <span className="font-bold text-indigo-900">20 años</span>
                                                    </div>
                                                    <div className="flex gap-1 mt-2">
                                                        {['10', '15', '20', '25'].map(yr => (
                                                            <button key={yr} className={`flex-1 text-[10px] py-1 rounded-md border font-medium ${yr === '20' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-700 border-indigo-200'}`}>
                                                                {yr}a
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="border-t border-indigo-200 pt-3 mt-4">
                                                    <div className="text-[10px] text-indigo-900/70 uppercase font-bold tracking-wider mb-1">Mensualidad est.</div>
                                                    <div className="text-xl font-black text-indigo-700">$24,350 <span className="text-xs font-semibold text-indigo-500">MXN</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 px-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                <HomeIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                <h3 className="text-lg font-bold text-slate-800 mb-1">No hay unidades publicadas</h3>
                                <p className="text-sm text-slate-500 max-w-md mx-auto">Este desarrollo aún no tiene unidades específicas registradas en el sistema para venta o renta.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
