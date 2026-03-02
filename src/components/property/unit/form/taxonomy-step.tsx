"use client";
/**
 * TaxonomyStep — Paso de clasificación taxonómica en el formulario de creación de propiedad
 *
 * Este componente se inserta como un paso adicional en el formulario multi-step
 * de creación de propiedad (FormPropertyUnit). Permite al usuario clasificar
 * su propiedad según la Taxonomía Inmobiliaria PropTech México:
 *   Vertical > Segmento > Subsegmento > Atributos especializados
 *
 * Los atributos especializados se renderizan dinámicamente según el subsegmento
 * seleccionado, recuperando los datos del Brain API (con fallback estático).
 *
 * Integración con react-hook-form:
 * - Los campos taxonomy_vertical_id, taxonomy_segment_id, taxonomy_subsegment_id
 *   se registran en el formulario padre via useFormContext.
 * - Los atributos EAV se guardan en taxonomy_attributes (Record<string, string>).
 */
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useTaxonomy } from "@/hooks/use-taxonomy";
import type { TaxAttribute } from "@/lib/brain-client";

// ============================================================
// TIPOS
// ============================================================

export interface TaxonomyFormData {
  taxonomy_vertical_id?: number | null;
  taxonomy_segment_id?: number | null;
  taxonomy_subsegment_id?: number | null;
  taxonomy_attributes?: Record<string, string>;
}

// ============================================================
// COMPONENTE
// ============================================================

export function TaxonomyStep() {
  const { setValue, watch } = useFormContext<TaxonomyFormData>();
  const [attrValues, setAttrValues] = useState<Record<string, string>>({});

  const watchedVertical = watch("taxonomy_vertical_id");
  const watchedSegment = watch("taxonomy_segment_id");
  const watchedSubsegment = watch("taxonomy_subsegment_id");

  const {
    availableVerticals,
    availableSegments,
    availableSubsegments,
    selection,
    selectVertical,
    selectSegment,
    selectSubsegment,
    dynamicAttributes,
    selectedVertical,
    selectedSegment,
    selectedSubsegment,
    isLoading,
  } = useTaxonomy({
    verticalId: watchedVertical ?? null,
    segmentId: watchedSegment ?? null,
    subsegmentId: watchedSubsegment ?? null,
  });

  // Sincronizar selección con el formulario
  const handleVerticalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    selectVertical(value);
    setValue("taxonomy_vertical_id", value);
    setValue("taxonomy_segment_id", null);
    setValue("taxonomy_subsegment_id", null);
    setValue("taxonomy_attributes", {});
    setAttrValues({});
  };

  const handleSegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    selectSegment(value);
    setValue("taxonomy_segment_id", value);
    setValue("taxonomy_subsegment_id", null);
    setValue("taxonomy_attributes", {});
    setAttrValues({});
  };

  const handleSubsegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    selectSubsegment(value);
    setValue("taxonomy_subsegment_id", value);
    setValue("taxonomy_attributes", {});
    setAttrValues({});
  };

  const handleAttrChange = (clave: string, value: string) => {
    const newValues = { ...attrValues, [clave]: value };
    setAttrValues(newValues);
    setValue("taxonomy_attributes", newValues);
  };

  const renderAttribute = (attr: TaxAttribute) => {
    const currentValue = attrValues[attr.clave] ?? "";

    switch (attr.tipoDato) {
      case "integer":
      case "decimal":
        return (
          <div key={attr.id} className="flex flex-col gap-y-2">
            <Label htmlFor={`tax_attr_${attr.clave}`}>
              {attr.nombre}
              {attr.unidad ? <span className="text-muted-foreground text-xs ml-1">({attr.unidad})</span> : null}
              {attr.requerido ? <span className="text-red-500 ml-1">*</span> : null}
            </Label>
            <Input
              type="number"
              id={`tax_attr_${attr.clave}`}
              placeholder={attr.tipoDato === "integer" ? "Ej: 2" : "Ej: 2.5"}
              value={currentValue}
              onChange={(e) => handleAttrChange(attr.clave, e.target.value)}
              step={attr.tipoDato === "decimal" ? "0.5" : "1"}
              min="0"
            />
          </div>
        );

      case "boolean":
        return (
          <div key={attr.id} className="flex items-center gap-3 py-1">
            <Checkbox
              id={`tax_attr_${attr.clave}`}
              checked={currentValue === "true"}
              onCheckedChange={(checked) =>
                handleAttrChange(attr.clave, checked ? "true" : "false")
              }
            />
            <Label htmlFor={`tax_attr_${attr.clave}`} className="font-normal cursor-pointer">
              {attr.nombre}
              {attr.requerido ? <span className="text-red-500 ml-1">*</span> : null}
            </Label>
          </div>
        );

      case "enum":
        return (
          <div key={attr.id} className="flex flex-col gap-y-2">
            <Label htmlFor={`tax_attr_${attr.clave}`}>
              {attr.nombre}
              {attr.requerido ? <span className="text-red-500 ml-1">*</span> : null}
            </Label>
            <NativeSelect
              id={`tax_attr_${attr.clave}`}
              value={currentValue}
              onChange={(e) => handleAttrChange(attr.clave, e.target.value)}
            >
              <NativeSelectOption value="">Seleccionar...</NativeSelectOption>
              {(attr.opcionesEnum ?? []).map((opt) => (
                <NativeSelectOption key={opt} value={opt}>
                  {opt}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        );

      case "text":
        return (
          <div key={attr.id} className="flex flex-col gap-y-2">
            <Label htmlFor={`tax_attr_${attr.clave}`}>
              {attr.nombre}
              {attr.requerido ? <span className="text-red-500 ml-1">*</span> : null}
            </Label>
            <Input
              type="text"
              id={`tax_attr_${attr.clave}`}
              placeholder={`Ingresa ${attr.nombre.toLowerCase()}`}
              value={currentValue}
              onChange={(e) => handleAttrChange(attr.clave, e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const globalAttrs = dynamicAttributes.filter(a => a.esGlobal);
  const specializedAttrs = dynamicAttributes.filter(a => !a.esGlobal);

  return (
    <section className="flex flex-col gap-6">
      {/* Header informativo */}
      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-1">
          Clasificación taxonómica
        </h3>
        <p className="text-xs text-blue-700">
          Clasifica tu propiedad para mejorar su visibilidad y que el sistema
          pueda mostrar los atributos especializados correctos. Esta clasificación
          también potencia los modelos de valuación y recomendación del Brain.
        </p>
      </div>

      {/* Breadcrumb de selección actual */}
      {(selectedVertical || selectedSegment || selectedSubsegment) && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedVertical && (
            <Badge variant="secondary" className="text-xs">
              {selectedVertical.nombre}
            </Badge>
          )}
          {selectedSegment && (
            <>
              <span className="text-muted-foreground text-xs">›</span>
              <Badge variant="secondary" className="text-xs">
                {selectedSegment.nombre}
              </Badge>
            </>
          )}
          {selectedSubsegment && (
            <>
              <span className="text-muted-foreground text-xs">›</span>
              <Badge className="text-xs bg-blue-600">
                {selectedSubsegment.nombre}
              </Badge>
            </>
          )}
        </div>
      )}

      {/* Selectores en cascada */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Vertical */}
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="tax_vertical">
            Vertical inmobiliaria <span className="text-red-500">*</span>
          </Label>
          {isLoading ? (
            <div className="h-9 bg-slate-100 animate-pulse rounded-md" />
          ) : (
            <NativeSelect
              id="tax_vertical"
              value={selection.verticalId?.toString() ?? ""}
              onChange={handleVerticalChange}
            >
              <NativeSelectOption value="" disabled>
                Seleccionar vertical
              </NativeSelectOption>
              {availableVerticals.map((v) => (
                <NativeSelectOption key={v.id} value={v.id.toString()}>
                  {v.nombre}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          )}
          <p className="text-xs text-muted-foreground">
            Categoría principal del activo
          </p>
        </div>

        {/* Segmento */}
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="tax_segment">
            Segmento <span className="text-red-500">*</span>
          </Label>
          <NativeSelect
            id="tax_segment"
            value={selection.segmentId?.toString() ?? ""}
            onChange={handleSegmentChange}
            disabled={!selection.verticalId}
          >
            <NativeSelectOption value="" disabled>
              {!selection.verticalId ? "Primero selecciona vertical" : "Seleccionar segmento"}
            </NativeSelectOption>
            {availableSegments.map((s) => (
              <NativeSelectOption key={s.id} value={s.id.toString()}>
                {s.nombre}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <p className="text-xs text-muted-foreground">
            Subcategoría dentro de la vertical
          </p>
        </div>

        {/* Subsegmento / Tipo específico */}
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="tax_subsegment">Tipo específico</Label>
          <NativeSelect
            id="tax_subsegment"
            value={selection.subsegmentId?.toString() ?? ""}
            onChange={handleSubsegmentChange}
            disabled={!selection.segmentId}
          >
            <NativeSelectOption value="">
              {!selection.segmentId ? "Primero selecciona segmento" : "Seleccionar tipo (opcional)"}
            </NativeSelectOption>
            {availableSubsegments.map((ss) => (
              <NativeSelectOption key={ss.id} value={ss.id.toString()}>
                {ss.nombre}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <p className="text-xs text-muted-foreground">
            Tipo exacto del activo
          </p>
        </div>
      </div>

      {/* Atributos especializados — aparecen solo si hay subsegmento */}
      {dynamicAttributes.length > 0 && (
        <div className="border rounded-lg p-4 bg-slate-50">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-semibold">
              Atributos especializados
            </h3>
            <Badge variant="outline" className="text-xs">
              {selectedSubsegment?.nombre ?? ""}
            </Badge>
          </div>

          {/* Atributos globales */}
          {globalAttrs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {globalAttrs.map(renderAttribute)}
            </div>
          )}

          {/* Separador */}
          {globalAttrs.length > 0 && specializedAttrs.length > 0 && (
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Específicos del tipo
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
          )}

          {/* Atributos especializados */}
          {specializedAttrs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {specializedAttrs.map(renderAttribute)}
            </div>
          )}
        </div>
      )}

      {/* Estado vacío — sin subsegmento seleccionado */}
      {selection.segmentId && dynamicAttributes.length === 0 && !isLoading && (
        <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Selecciona un tipo específico para ver los atributos especializados
            disponibles para este tipo de activo.
          </p>
        </div>
      )}
    </section>
  );
}
