"use client";
import dynamic from "next/dynamic";
import { InputForm } from "@/components/shared/input-form";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { type DevelopmentLocation } from "@/schemas";
import { AMENITIES, CITIES, STATES } from "@/utils/constants";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const AddressAutoComplete = dynamic(
  () => import("@/components/shared/address-autocomplete"),
  { ssr: false }
);

// Agrupamos amenidades por categoría para la UI
const AMENITIES_GROUPS = AMENITIES.reduce<
  Record<string, typeof AMENITIES>
>((acc, amenity) => {
  const grupo = amenity.grupo;
  if (!acc[grupo]) acc[grupo] = [];
  acc[grupo].push(amenity);
  return acc;
}, {});

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

export function LocationCharacteristicsStep() {
  const {
    register,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useFormContext<DevelopmentLocation>();

  // City filtering by selected state
  const selectedEstado = watch("id_estado");
  const filteredCities = selectedEstado
    ? CITIES.filter((c) => c.id_estado === Number(selectedEstado))
    : [];

  return (
    <section className="grid grid-cols-2 items-start gap-6">
      {/* ── Location fields ────────────────────────────────────────── */}
      <div className="w-full col-span-2 grid grid-cols-3 gap-6 items-start">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_estado">Estado *</Label>
          <NativeSelect {...register("id_estado", { valueAsNumber: true })}>
            <NativeSelectOption value={""}>
              Seleccionar estado
            </NativeSelectOption>
            {STATES.map((state) => (
              <NativeSelectOption key={state.id} value={state.id}>
                {state.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="id_ciudad">Ciudad *</Label>
          <NativeSelect
            {...register("id_ciudad", { valueAsNumber: true })}
            disabled={!selectedEstado}
          >
            <NativeSelectOption value={""}>
              {selectedEstado
                ? "Seleccionar ciudad"
                : "Primero selecciona un estado"}
            </NativeSelectOption>
            {filteredCities.map((city) => (
              <NativeSelectOption key={city.id} value={city.id}>
                {city.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <InputForm
          label="Código postal"
          type="text"
          placeholder="Ej: 12345"
          {...register("codigo_postal")}
          error={errors.codigo_postal?.message}
        />
      </div>

      <div className="w-full col-span-2 grid grid-cols-2 gap-6 items-start">
        <AddressAutoComplete
          onRetrieve={(res) => {
            const feature = res.features[0];
            if (feature?.geometry?.coordinates) {
              const [lng, lat] = feature.geometry.coordinates;
              setValue("longitud", lng);
              setValue("latitud", lat);
            }
          }}
        >
          <InputForm
            label="Dirección (calle y número) *"
            type="text"
            placeholder="Ej: Av. Siempre Viva 123"
            {...register("direccion")}
            error={errors.direccion?.message}
            autoComplete="address"
          />
        </AddressAutoComplete>
        <InputForm
          label="Colonia"
          type="text"
          placeholder="Ej: Centro"
          {...register("colonia")}
          error={errors.colonia?.message}
        />
      </div>

      <Separator className="col-span-2" />

      {/* ── Amenidades del desarrollo ──────────────────────────────── */}
      <Controller
        control={control}
        name="amenidades"
        render={({ field }) => (
          <div className="flex flex-col gap-y-4 col-span-2 w-full">
            <div>
              <Label>Amenidades del desarrollo</Label>
              <p className="text-sm text-muted-foreground">
                Selecciona las amenidades generales que ofrece el desarrollo
              </p>
            </div>
            {Object.entries(AMENITIES_GROUPS).map(
              ([grupo, amenidades]) => (
                <div key={grupo} className="flex flex-col gap-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {GROUP_LABELS[grupo] ?? grupo}
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {amenidades.map((amenidad) => {
                      const currentValue = field.value ?? [];
                      const isChecked = currentValue.includes(amenidad.id);
                      return (
                        <div
                          key={amenidad.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`amenidad-${amenidad.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...currentValue, amenidad.id]);
                              } else {
                                field.onChange(
                                  currentValue.filter(
                                    (id) => id !== amenidad.id
                                  )
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={`amenidad-${amenidad.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {amenidad.nombre}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      />

      <Separator className="col-span-2" />

      {/* ── Características adicionales ────────────────────────────── */}
      <div className="flex flex-col gap-y-2 col-span-2 w-full">
        <Label htmlFor="caracteristicas">Características adicionales</Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Describe cualquier otra característica relevante del desarrollo..."
          {...register("caracteristicas")}
          aria-invalid={errors.caracteristicas ? "true" : "false"}
        />
      </div>
    </section>
  );
}
