"use client";
import { ChangeEvent, RefObject } from "react";
import { ErrorMessage } from "@/components/shared";
import { InputForm } from "@/components/shared/input-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { type BasicInfo } from "@/schemas";
import {
  TYPES_OF_OPERATIONS,
  TYPES_OF_UNITS,
  TYPES_OF_USES,
} from "@/utils/constants";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
interface Props {
  handleClick: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  unitsImageUrls: string[];
}
export function BasicInformationStep({
  handleClick,
  handleChange,
  inputRef,
  unitsImageUrls,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BasicInfo>();
  return (
    <section className="grid grid-cols-2 items-start gap-6">
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="tipo_unidad">Tipo unidad *</Label>
        <div className="flex flex-col gap-y-1">
          <NativeSelect
            id="tipo_unidad"
            {...register("tipo")}
            aria-invalid={errors.tipo ? "true" : "false"}
          >
            <NativeSelectOption value="" disabled>
              Seleccionar tipo de unidad
            </NativeSelectOption>
            {TYPES_OF_UNITS.map((unit_type) => (
              <NativeSelectOption key={unit_type.id} value={unit_type.label}>
                {unit_type.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          {errors.tipo && <ErrorMessage message={errors.tipo.message!} />}
        </div>
      </div>
      <InputForm
        label="Nombre de la unidad *"
        type="text"
        {...register("nombre")}
        placeholder="Ej: Tipo A, piso 1 - Local 5"
        error={errors.nombre?.message}
      />
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="id_tipo_operacion">Tipo de operación *</Label>
        <NativeSelect
          id="id_tipo_operacion"
          {...register("id_tipo_accion", { valueAsNumber: true })}
        >
          {TYPES_OF_OPERATIONS.map((type) => (
            <NativeSelectOption key={type.id} value={type.id}>
              {type.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label id="id_tipo_uso" htmlFor="id_tipo_uso">
          Tipo de uso *
        </Label>
        <NativeSelect
          id="id_tipo_uso"
          {...register("id_tipo_uso", { valueAsNumber: true })}
        >
          {TYPES_OF_USES.map((type) => (
            <NativeSelectOption key={type.id} value={type.id}>
              {type.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-y-4 col-span-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="imagenes">Imagenes generales *</Label>
          <Button type="button" variant="outline" onClick={handleClick}>
            <UploadIcon />
            Agregar fotos
          </Button>
          {/* Input oculto */}
          <Input
            type="file"
            ref={inputRef}
            onChange={handleChange}
            className="hidden" // ocultamos el input
            multiple
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="w-full flex items-center justify-start col-span-4">
            {unitsImageUrls.length === 0 && (
              <span className="text-sm text-muted-foreground">
                No hay imagenes subidas
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {unitsImageUrls[index] ? (
                  <Image
                    src={unitsImageUrls[index]}
                    width={140}
                    height={140}
                    alt={`img-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <UploadIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_unidad">Describe esta unidad *</Label>
        <div className="flex flex-col gap-y-1">
          <Textarea
            className="min-h-20 max-h-40"
            placeholder="Ej: Espectacular departamento con vista al mar..."
            {...register("descripcion")}
            aria-invalid={errors.descripcion ? "true" : "false"}
          />
          {errors.descripcion && (
            <ErrorMessage message={errors.descripcion.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_estado">
          Describe el estado de esta unidad *
        </Label>
        <div className="flex flex-col gap-y-1">
          <Textarea
            className="min-h-20 max-h-40"
            placeholder="Ej: Acabados de primera calidad..."
            {...register("descripcion_estado")}
            aria-invalid={errors.descripcion_estado ? "true" : "false"}
          />
          {errors.descripcion_estado && (
            <ErrorMessage message={errors.descripcion_estado.message!} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 col-span-2">
        <Label htmlFor="descripcion_inversion_unidad">
          Describe la inversión para esta unidad
        </Label>
        <div className="flex flex-col gap-y-1">
          <Textarea
            className="min-h-20 max-h-40"
            placeholder="Ej: Excelente oportunidad de rendimiento..."
            {...register("descripcion_inversion")}
            aria-invalid={errors.descripcion_inversion ? "true" : "false"}
          />
          {errors.descripcion_inversion && (
            <ErrorMessage message={errors.descripcion_inversion.message!} />
          )}
        </div>
      </div>
    </section>
  );
}
