"use client";
import { InputForm } from "@/components/shared/input-form";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { LocationCharacteristics } from "@/schemas";
import { CITIES, STATES, AMENITIES } from "@/utils/constants";
import { useFormContext, Controller } from "react-hook-form";

export function LocationCharacteristicsStep() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<LocationCharacteristics>();
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
      <InputForm
        label="Precio *"
        type="text"
        placeholder="Ej: 25.000"
        {...register("precio", { valueAsNumber: true })}
        error={errors.precio?.message}
      />
      <InputForm
        label="Área (m2) *"
        type="number"
        placeholder="Ej: 120"
        {...register("area", { valueAsNumber: true })}
        error={errors.area?.message}
      />
      <div className="w-full col-span-2 grid grid-cols-3 gap-6">
        <InputForm
          label="Cant. Habitaciones"
          type="number"
          placeholder="Ej: 2"
          {...register("habitaciones", { valueAsNumber: true })}
          error={errors.habitaciones?.message}
        />
        <InputForm
          label="Baños *"
          type="number"
          placeholder="Ej: 2"
          {...register("banios", { valueAsNumber: true })}
          error={errors.banios?.message}
        />
        <InputForm
          label="Estacionamientos"
          type="number"
          placeholder="Ej: 2"
          {...register("estacionamientos", { valueAsNumber: true })}
          error={errors.estacionamientos?.message}
        />
      </div>

      <Controller
        control={control}
        name="amenidades"
        render={({ field }) => (
          <div className="flex flex-col gap-y-2 col-span-2 w-full">
            <Label>Amenidades</Label>
            <p className="text-sm text-muted-foreground">
              Selecciona las amenidades generales que ofrece el desarrollo
            </p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {AMENITIES.map((amenidad) => {
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
                            currentValue.filter((id) => id !== amenidad.id)
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
        )}
      />

      <div className="flex flex-col gap-y-2 col-span-2 w-full">
        <Label htmlFor="caracteristicas">Caracteristicas adicionales</Label>
        <Textarea
          className="min-h-20 max-h-40"
          placeholder="Aire acondicionado, seguridad 24hs..."
          {...register("caracteristicas")}
          aria-invalid={errors.caracteristicas ? "true" : "false"}
        />
      </div>
    </section>
  );
}
