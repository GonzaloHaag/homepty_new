"use client";
import { InputForm } from "@/components/shared/input-form";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { LocationCharacteristicsProperty } from "@/schemas";
import { CITIES, STATES } from "@/utils/constants";
import { useFormContext } from "react-hook-form";

export function LocationCharacteristicsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LocationCharacteristicsProperty>();

  return (
    <section className="grid grid-cols-2 items-start gap-6">
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
          <NativeSelect {...register("id_ciudad", { valueAsNumber: true })}>
            <NativeSelectOption value={""}>
              Seleccionar ciudad
            </NativeSelectOption>
            {CITIES.map((city) => (
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
        <InputForm
          label="Dirección (calle y número) *"
          type="text"
          placeholder="Ej: Av. Siempre Viva 123"
          {...register("direccion")}
          error={errors.direccion?.message}
        />
        <InputForm
          label="Colonia"
          type="text"
          placeholder="Ej: Centro"
          {...register("colonia")}
          error={errors.colonia?.message}
        />
      </div>

      <Separator className="col-span-2" />

      <div className="w-full col-span-2 grid grid-cols-3 gap-6">
         <InputForm
        label="Precio total del desarrollo *"
        type="number"
        placeholder="Ej: 5000000"
        {...register("precio", { valueAsNumber: true })}
        error={errors.precio?.message}
      />
      <InputForm
        label="Área total (m²) *"
        type="number"
        placeholder="Ej: 5000"
        {...register("area", { valueAsNumber: true })}
        error={errors.area?.message}
      />
      <InputForm
        label="Área construida (m²)"
        type="number"
        placeholder="Ej: 3500"
        {...register("area_construida", { valueAsNumber: true })}
        error={errors.area_construida?.message}
      />
      </div>

      <div className="w-full col-span-2 grid grid-cols-3 gap-6">
        <InputForm
          label="Cant. Habitaciones *"
          type="number"
          placeholder="Ej: 10"
          {...register("habitaciones", { valueAsNumber: true })}
          error={errors.habitaciones?.message}
        />
        <InputForm
          label="Baños *"
          type="number"
          placeholder="Ej: 8"
          {...register("banios", { valueAsNumber: true })}
          error={errors.banios?.message}
        />
        <InputForm
          label="Estacionamientos"
          type="number"
          placeholder="Ej: 15"
          {...register("estacionamientos", { valueAsNumber: true })}
          error={errors.estacionamientos?.message}
        />
      </div>

      <div className="flex flex-col gap-y-2 col-span-2 w-full">
        <Label htmlFor="caracteristicas">Características adicionales</Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Aire acondicionado, seguridad 24hs, áreas verdes..."
          {...register("caracteristicas")}
          aria-invalid={errors.caracteristicas ? "true" : "false"}
        />
      </div>
    </section>
  );
}
