import { TYPES_OF_OPERATIONS, TYPES_OF_PROPERTIES } from "@/utils/constants";
import { Input } from "../ui/input";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Button } from "../ui/button";
import { FilterIcon, SearchIcon } from "lucide-react";

export function Filters() {
  return (
    <form className="w-full flex items-center gap-4 bg-muted/50 p-4 rounded">
      <Input
        type="search"
        placeholder="Nombre, estado o ciudad..."
        className="md:max-w-xs"
      />
      <NativeSelect className="w-48">
        <NativeSelectOption value="">
          Tipo de operación
        </NativeSelectOption>
        {TYPES_OF_OPERATIONS.map((operation) => (
            <NativeSelectOption key={operation.id} value={operation.value}>
              {operation.label}
            </NativeSelectOption>
          ))} 
      </NativeSelect>
      <NativeSelect className="w-48">
        <NativeSelectOption value="">
          Tipo de propiedad
        </NativeSelectOption>
        {TYPES_OF_PROPERTIES.map((type) => (
          <NativeSelectOption key={type.id} value={type.value}>
            {type.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Button type="button" title="Más filtros" variant={"outline"}>
        <FilterIcon size={16} />
        Más filtros
      </Button>
      <Button type="submit" title="Buscar">
        <SearchIcon size={16} />
        Buscar
      </Button>
    </form>
  );
}
