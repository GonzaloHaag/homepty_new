"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  UnitInlineForm,
  createEmptyUnit,
  type InlineUnitData,
} from "./unit-inline-form";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  HomeIcon,
  BuildingIcon,
  StoreIcon,
  BriefcaseIcon,
} from "lucide-react";
import Image from "next/image";

// ─── Props ────────────────────────────────────────────────────────────────────
interface UnitsStepProps {
  units: InlineUnitData[];
  onAddUnit: (unit: InlineUnitData) => void;
  onUpdateUnit: (clientId: string, unit: InlineUnitData) => void;
  onDeleteUnit: (clientId: string) => void;
}

// ─── Icon lookup by unit type ─────────────────────────────────────────────────
const UNIT_ICON: Record<string, typeof HomeIcon> = {
  Departamento: BuildingIcon,
  "Local comercial": StoreIcon,
  Oficina: BriefcaseIcon,
  Casa: HomeIcon,
};

// ─── Component ────────────────────────────────────────────────────────────────
export function UnitsStep({
  units,
  onAddUnit,
  onUpdateUnit,
  onDeleteUnit,
}: UnitsStepProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Group units by tipo
  const grouped = units.reduce<Record<string, InlineUnitData[]>>((acc, u) => {
    const key = u.tipo || "Sin tipo";
    if (!acc[key]) acc[key] = [];
    acc[key].push(u);
    return acc;
  }, {});

  const handleSaveNew = (unit: InlineUnitData) => {
    onAddUnit(unit);
    setShowForm(false);
  };

  const handleSaveEdit = (unit: InlineUnitData) => {
    onUpdateUnit(unit._clientId, unit);
    setEditingId(null);
  };

  const handleCancelNew = () => setShowForm(false);
  const handleCancelEdit = () => setEditingId(null);

  return (
    <section className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-base">Unidades del desarrollo</h3>
          <p className="text-sm text-muted-foreground">
            Agrega los diferentes tipos de unidades que componen este desarrollo
            (departamentos, oficinas, locales, etc.)
          </p>
        </div>
        {!showForm && !editingId && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(true)}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Agregar unidad
          </Button>
        )}
      </div>

      {/* ── Inline form (create) ──────────────────────────────────── */}
      {showForm && (
        <UnitInlineForm onSave={handleSaveNew} onCancel={handleCancelNew} />
      )}

      {/* ── Saved units grouped by type ───────────────────────────── */}
      {Object.entries(grouped).map(([tipo, unitsGroup]) => {
        const Icon = UNIT_ICON[tipo] ?? HomeIcon;
        return (
          <div key={tipo} className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2 text-sm font-semibold text-muted-foreground">
              <Icon className="w-4 h-4" />
              <span>
                {tipo} ({unitsGroup.length})
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {unitsGroup.map((unit) => {
                // If editing this unit, show inline form
                if (editingId === unit._clientId) {
                  return (
                    <UnitInlineForm
                      key={unit._clientId}
                      initialData={unit}
                      onSave={handleSaveEdit}
                      onCancel={handleCancelEdit}
                    />
                  );
                }

                return (
                  <Card
                    key={unit._clientId}
                    className="flex items-center gap-4 p-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                      {unit.imagePreviewUrls.length > 0 ? (
                        <Image
                          src={unit.imagePreviewUrls[0]}
                          width={64}
                          height={64}
                          alt={unit.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {unit.tipo}
                        </span>
                        <span className="font-medium text-sm truncate">
                          {unit.nombre}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 flex gap-3 flex-wrap">
                        <span>
                          ${unit.precio.toLocaleString("es-MX")} MXN
                        </span>
                        <span>{unit.area} m²</span>
                        {unit.habitaciones > 0 && (
                          <span>{unit.habitaciones} hab</span>
                        )}
                        {unit.banios > 0 && (
                          <span>{unit.banios} baños</span>
                        )}
                        {unit.imagePreviewUrls.length > 0 && (
                          <span>
                            {unit.imagePreviewUrls.length} foto
                            {unit.imagePreviewUrls.length > 1 ? "s" : ""}
                          </span>
                        )}
                        {unit.floorPlanPreviewUrl && (
                          <span>✓ Plano</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingId(unit._clientId)}
                        title="Editar"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteUnit(unit._clientId)}
                        title="Eliminar"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ── Empty state ───────────────────────────────────────────── */}
      {units.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
          <BuildingIcon className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">
            Aún no has agregado unidades a este desarrollo
          </p>
          <Button
            type="button"
            variant="link"
            className="mt-2"
            onClick={() => setShowForm(true)}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Agregar la primera unidad
          </Button>
        </div>
      )}
    </section>
  );
}
