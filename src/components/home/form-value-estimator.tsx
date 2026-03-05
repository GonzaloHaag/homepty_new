import { TYPES_OF_PROPERTIES } from "@/utils/constants";
import { Field, FieldLabel } from "../ui/field";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { DialogCloseButton, InputForm } from "../shared";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormEvent } from "react";
import { toast } from "sonner";

export function FormValueEstimator() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("Funcionalidad en desarrollo");
  };
  return (
    <form onSubmit={onSubmit} className="w-full grid md:grid-cols-2 gap-4">
      <Field>
        <FieldLabel>Tipo de propiedad</FieldLabel>
        <NativeSelect defaultValue={""}>
          <NativeSelectOption value={""}>Seleccionar tipo</NativeSelectOption>
          {TYPES_OF_PROPERTIES.map((type) => (
            <NativeSelectOption key={type.value} value={type.value}>
              {type.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>
      <InputForm
        label="Ubicación"
        name="location"
        placeholder="Ej: Madrid, Barcelona..."
        type="text"
      />

      <div className="md:col-span-2 grid md:grid-cols-3 gap-4">
        <InputForm
          label="Área total (m2)"
          name="totalArea"
          placeholder="Ej: 100"
          type="number"
        />
        <InputForm
          label="Área construida (m2)"
          name="builtArea"
          placeholder="Ej: 100"
          type="number"
        />
        <Field>
          <FieldLabel>Calidad de const.</FieldLabel>
          <NativeSelect defaultValue={""}>
            <NativeSelectOption value={""}>
              Seleccionar calidad
            </NativeSelectOption>
            <NativeSelectOption value="económica">Económica</NativeSelectOption>
            <NativeSelectOption value="media">Media</NativeSelectOption>
            <NativeSelectOption value="alta">Alta</NativeSelectOption>
          </NativeSelect>
        </Field>
      </div>
      <InputForm
        label="Habitaciones"
        name="rooms"
        placeholder="Ej: 3"
        type="number"
      />
      <InputForm
        label="Baños"
        name="bathrooms"
        placeholder="Ej: 2"
        type="number"
      />
      <div className="col-span-2 w-full">
        <InputForm
        label="Año de construcción"
        name="constructionYear"
        placeholder="Ej: 2005"
        type="number"
        className="w-full"
      />
      </div>
      <DialogFooter className="col-span-2">
        <DialogCloseButton />
        <Button
          type="submit"
          variant={"default"}
          title="Calcular valor"
          className="min-w-28"
        >
          Calcular valor
        </Button>
      </DialogFooter>
    </form>
  );
}
