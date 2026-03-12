"use client";
import { useState, useRef, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { InputForm } from "@/components/shared/input-form";
import { TYPES_OF_UNITS, AMENITIES } from "@/utils/constants";
import { UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface InlineUnitData {
    /** Client-side unique ID */
    _clientId: string;
    tipo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    area: number;
    habitaciones: number;
    banios: number;
    estacionamientos: number;
    amenidades: number[];
    caracteristicas: string;
    /** Object URLs for preview */
    imagePreviewUrls: string[];
    /** Actual File objects for upload */
    imageFiles: File[];
    /** Floor plan preview URL */
    floorPlanPreviewUrl: string | null;
    /** Floor plan File */
    floorPlanFile: File | null;
}

export function createEmptyUnit(): InlineUnitData {
    return {
        _clientId: crypto.randomUUID(),
        tipo: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        area: 0,
        habitaciones: 0,
        banios: 0,
        estacionamientos: 0,
        amenidades: [],
        caracteristicas: "",
        imagePreviewUrls: [],
        imageFiles: [],
        floorPlanPreviewUrl: null,
        floorPlanFile: null,
    };
}

// ─── Group labels for amenities ───────────────────────────────────────────────
const GROUP_LABELS: Record<string, string> = {
    Wellness: "Bienestar",
    Social: "Social",
    Sports: "Deportes",
    Work: "Trabajo",
    Services: "Servicios",
    Green: "Áreas verdes",
    Entertainment: "Entretenimiento",
    Industrial: "Industrial",
};

const AMENITIES_GROUPS = AMENITIES.reduce<Record<string, typeof AMENITIES>>(
    (acc, amenity) => {
        if (!acc[amenity.grupo]) acc[amenity.grupo] = [];
        acc[amenity.grupo].push(amenity);
        return acc;
    },
    {}
);

// ─── Component ────────────────────────────────────────────────────────────────
interface UnitInlineFormProps {
    /** If provided, the form starts pre-filled (edit mode) */
    initialData?: InlineUnitData;
    onSave: (unit: InlineUnitData) => void;
    onCancel: () => void;
}

export function UnitInlineForm({
    initialData,
    onSave,
    onCancel,
}: UnitInlineFormProps) {
    const [unit, setUnit] = useState<InlineUnitData>(
        initialData ?? createEmptyUnit()
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const floorPlanInputRef = useRef<HTMLInputElement | null>(null);

    const isEdit = !!initialData;

    // ── Field update helper ─────────────────────────────────────────────────
    const updateField = <K extends keyof InlineUnitData>(
        key: K,
        value: InlineUnitData[K]
    ) => {
        setUnit((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    // ── Image handlers ──────────────────────────────────────────────────────
    const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const newUrls = files.map((f) => URL.createObjectURL(f));
        setUnit((prev) => ({
            ...prev,
            imageFiles: [...prev.imageFiles, ...files],
            imagePreviewUrls: [...prev.imagePreviewUrls, ...newUrls],
        }));
    };

    const handleRemoveImage = (index: number) => {
        setUnit((prev) => ({
            ...prev,
            imageFiles: prev.imageFiles.filter((_, i) => i !== index),
            imagePreviewUrls: prev.imagePreviewUrls.filter((_, i) => i !== index),
        }));
    };

    // ── Floor plan handlers ─────────────────────────────────────────────────
    const handleFloorPlan = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUnit((prev) => ({
            ...prev,
            floorPlanFile: file,
            floorPlanPreviewUrl: URL.createObjectURL(file),
        }));
    };

    const handleRemoveFloorPlan = () => {
        setUnit((prev) => ({
            ...prev,
            floorPlanFile: null,
            floorPlanPreviewUrl: null,
        }));
    };

    // ── Amenidades toggle ────────────────────────────────────────────────────
    const toggleAmenidad = (id: number, checked: boolean) => {
        setUnit((prev) => ({
            ...prev,
            amenidades: checked
                ? [...prev.amenidades, id]
                : prev.amenidades.filter((a) => a !== id),
        }));
    };

    // ── Validation ──────────────────────────────────────────────────────────
    const validate = (): boolean => {
        const errs: Record<string, string> = {};
        if (!unit.tipo) errs.tipo = "Selecciona un tipo de unidad";
        if (!unit.nombre || unit.nombre.length < 2)
            errs.nombre = "Mínimo 2 caracteres";
        if (!unit.precio || unit.precio <= 0)
            errs.precio = "El precio debe ser positivo";
        if (!unit.area || unit.area <= 0)
            errs.area = "El área debe ser positiva";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Submit ──────────────────────────────────────────────────────────────
    const handleSave = () => {
        if (!validate()) return;
        onSave(unit);
    };

    return (
        <Card className="p-6 border-primary/30 bg-primary/5">
            <div className="flex flex-col gap-y-6">
                <h3 className="font-semibold text-base">
                    {isEdit ? "Editar unidad" : "Nueva unidad"}
                </h3>

                {/* ── Row 1: Tipo + Nombre ───────────────────────────────── */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-y-2">
                        <Label>Tipo de unidad *</Label>
                        <NativeSelect
                            value={unit.tipo}
                            onChange={(e) => updateField("tipo", e.target.value)}
                        >
                            <NativeSelectOption value="" disabled>
                                Seleccionar tipo
                            </NativeSelectOption>
                            {TYPES_OF_UNITS.map((t) => (
                                <NativeSelectOption key={t.id} value={t.value}>
                                    {t.label}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>
                        {errors.tipo && (
                            <span className="text-xs text-destructive">{errors.tipo}</span>
                        )}
                    </div>
                    <InputForm
                        label="Nombre del modelo *"
                        type="text"
                        placeholder="Ej: Tipo A, Penthouse Premium"
                        value={unit.nombre}
                        onChange={(e) => updateField("nombre", e.target.value)}
                        error={errors.nombre}
                    />
                </div>

                {/* ── Row 2: Precio + Área ───────────────────────────────── */}
                <div className="grid grid-cols-3 gap-6">
                    <InputForm
                        label="Precio *"
                        type="number"
                        placeholder="Ej: 2500000"
                        value={unit.precio || ""}
                        onChange={(e) => updateField("precio", Number(e.target.value))}
                        error={errors.precio}
                    />
                    <InputForm
                        label="Área (m²) *"
                        type="number"
                        placeholder="Ej: 85"
                        value={unit.area || ""}
                        onChange={(e) => updateField("area", Number(e.target.value))}
                        error={errors.area}
                    />
                    <InputForm
                        label="Estacionamientos"
                        type="number"
                        placeholder="Ej: 1"
                        value={unit.estacionamientos || ""}
                        onChange={(e) =>
                            updateField("estacionamientos", Number(e.target.value))
                        }
                    />
                </div>

                {/* ── Row 3: Habitaciones + Baños ────────────────────────── */}
                <div className="grid grid-cols-3 gap-6">
                    <InputForm
                        label="Habitaciones"
                        type="number"
                        placeholder="Ej: 2"
                        value={unit.habitaciones || ""}
                        onChange={(e) =>
                            updateField("habitaciones", Number(e.target.value))
                        }
                    />
                    <InputForm
                        label="Baños"
                        type="number"
                        placeholder="Ej: 2"
                        value={unit.banios || ""}
                        onChange={(e) => updateField("banios", Number(e.target.value))}
                    />
                </div>

                {/* ── Descripción ────────────────────────────────────────── */}
                <div className="flex flex-col gap-y-2">
                    <Label>Descripción</Label>
                    <Textarea
                        className="min-h-20 max-h-40"
                        placeholder="Describe esta unidad..."
                        value={unit.descripcion}
                        onChange={(e) => updateField("descripcion", e.target.value)}
                    />
                </div>

                {/* ── Fotos de la unidad ──────────────────────────────────── */}
                <div className="flex flex-col gap-y-3">
                    <div className="flex items-center justify-between">
                        <Label>Fotos de la unidad</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <UploadIcon className="w-4 h-4 mr-1" />
                            Agregar fotos
                        </Button>
                        <Input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleAddImages}
                            className="hidden"
                            multiple
                            accept="image/*"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {unit.imagePreviewUrls.map((url, i) => (
                            <div key={i} className="relative aspect-square">
                                <Image
                                    src={url}
                                    width={140}
                                    height={140}
                                    alt={`unit-img-${i}`}
                                    className="w-full h-full object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(i)}
                                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5"
                                >
                                    <XIcon className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        {unit.imagePreviewUrls.length === 0 && (
                            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                <UploadIcon className="w-6 h-6 text-gray-400" />
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Plano (Floor Plan) — campo separado ────────────────── */}
                <div className="flex flex-col gap-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Plano de la unidad</Label>
                            <p className="text-xs text-muted-foreground">
                                Sube el plano arquitectónico de esta unidad (campo separado de
                                las fotos)
                            </p>
                        </div>
                        {!unit.floorPlanPreviewUrl && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => floorPlanInputRef.current?.click()}
                            >
                                <UploadIcon className="w-4 h-4 mr-1" />
                                Subir plano
                            </Button>
                        )}
                        <Input
                            type="file"
                            ref={floorPlanInputRef}
                            onChange={handleFloorPlan}
                            className="hidden"
                            accept="image/*,.pdf"
                        />
                    </div>
                    {unit.floorPlanPreviewUrl ? (
                        <div className="relative w-48 aspect-[4/3]">
                            <Image
                                src={unit.floorPlanPreviewUrl}
                                width={192}
                                height={144}
                                alt="floor-plan"
                                className="w-full h-full object-contain rounded-lg border bg-white"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveFloorPlan}
                                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5"
                            >
                                <XIcon className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <div className="w-48 aspect-[4/3] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                            <span className="text-xs text-gray-400">Sin plano</span>
                        </div>
                    )}
                </div>

                {/* ── Amenidades de la unidad ─────────────────────────────── */}
                <div className="flex flex-col gap-y-3">
                    <Label>Amenidades de la unidad</Label>
                    {Object.entries(AMENITIES_GROUPS).map(([grupo, amenidades]) => (
                        <div key={grupo} className="flex flex-col gap-y-1">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {GROUP_LABELS[grupo] ?? grupo}
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                                {amenidades.map((a) => (
                                    <div key={a.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`unit-amenidad-${unit._clientId}-${a.id}`}
                                            checked={unit.amenidades.includes(a.id)}
                                            onCheckedChange={(checked) =>
                                                toggleAmenidad(a.id, !!checked)
                                            }
                                        />
                                        <Label
                                            htmlFor={`unit-amenidad-${unit._clientId}-${a.id}`}
                                            className="text-sm font-normal cursor-pointer"
                                        >
                                            {a.nombre}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Características adicionales ─────────────────────────── */}
                <div className="flex flex-col gap-y-2">
                    <Label>Características adicionales</Label>
                    <Textarea
                        className="min-h-16 max-h-32"
                        placeholder="Aire acondicionado, vista panorámica..."
                        value={unit.caracteristicas}
                        onChange={(e) => updateField("caracteristicas", e.target.value)}
                    />
                </div>

                {/* ── Actions ────────────────────────────────────────────── */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        {isEdit ? "Actualizar unidad" : "Guardar unidad"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
