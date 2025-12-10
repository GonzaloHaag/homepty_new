"use client";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { InfoIcon, XIcon } from "lucide-react";
import { UnitWithImages } from "@/types";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useState } from "react";
import Image from "next/image";

interface Props {
  availableUnits: UnitWithImages[];
  selectedUnits: UnitWithImages[];
  onSelectUnit: (unit: UnitWithImages) => void;
  onRemoveUnit: (unitId: number) => void;
}

export function UnitsStep({ availableUnits, selectedUnits, onSelectUnit, onRemoveUnit }: Props) {
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");

  const handleAddUnit = () => {
    if (selectedUnitId) {
      const unit = availableUnits.find(u => u.id === parseInt(selectedUnitId));
      if (unit) {
        onSelectUnit(unit);
        setSelectedUnitId("");
      }
    }
  };

  const unassignedUnits = availableUnits.filter(
    u => !selectedUnits.some(su => su.id === u.id)
  );

  return (
    <section className="grid grid-cols-1 gap-6">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <Label>Unidades del desarrollo</Label>
          <p className="text-sm text-muted-foreground">
            Selecciona las unidades que pertenecerán a este desarrollo
          </p>
        </div>

        <Card className="p-6">
          <div className="flex items-start gap-x-4">
            <InfoIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="flex flex-col gap-y-2">
              <h4 className="font-medium">Instrucciones</h4>
              <p className="text-sm text-muted-foreground">
                Selecciona unidades existentes que no estén asignadas a ningún desarrollo.
                Si no tienes unidades disponibles, primero crea unidades individuales desde la sección de propiedades.
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-x-4">
          <div className="flex-1">
            <NativeSelect
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
            >
              <NativeSelectOption value="">Seleccionar unidad</NativeSelectOption>
              {unassignedUnits.map((unit) => (
                <NativeSelectOption key={unit.id} value={unit.id.toString()}>
                  {unit.nombre} - {unit.tipo} - ${unit.precio.toLocaleString()}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <Button
            type="button"
            onClick={handleAddUnit}
            disabled={!selectedUnitId}
          >
            Agregar
          </Button>
        </div>

        {selectedUnits.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <Label>Unidades seleccionadas ({selectedUnits.length})</Label>
            <div className="grid grid-cols-1 gap-4">
              {selectedUnits.map((unit) => (
                <Card key={unit.id} className="p-4">
                  <div className="flex items-center gap-x-4">
                    {unit.imagenes_unidades[0] && (
                      <Image
                        src={unit.imagenes_unidades[0].image_url}
                        alt={unit.nombre}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 flex flex-col gap-y-1">
                      <h4 className="font-medium">{unit.nombre}</h4>
                      <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
                        <span>{unit.tipo}</span>
                        <span>•</span>
                        <span>${unit.precio.toLocaleString()}</span>
                        <span>•</span>
                        <span>{unit.area}m²</span>
                        <span>•</span>
                        <span>{unit.habitaciones} hab</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveUnit(unit.id)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {unassignedUnits.length === 0 && selectedUnits.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              No tienes unidades disponibles. Crea unidades individuales primero para poder asignarlas a este desarrollo.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
}
