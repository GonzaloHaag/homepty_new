import { FilterIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { TYPES_OF_PROPERTIES } from "@/utils/constants";
import { Button } from "../ui/button";

export function SectionFilters() {
  return (
    <section className="flex items-center gap-x-2">
      <form className="flex items-center gap-x-4 w-full">
        <div className="relative w-full">
          <Input
            type="search"
            placeholder="Ingrese localidad..."
            className="w-full px-8"
          />
          <MapPinIcon
            size={20}
            className="absolute top-0 bottom-0 left-2 my-auto mx-0 text-primary/70"
          />
        </div>
        <NativeSelect className="w-48">
          <NativeSelectOption value={""}>Todos los tipos</NativeSelectOption>
          {TYPES_OF_PROPERTIES.map((type) => (
            <NativeSelectOption key={type.id} value={type.value}>
              {type.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Button type="submit" title="Buscar">
            <SearchIcon size={16} />
            Buscar
        </Button>
      </form>
      <Button type="button" variant={"outline"} title="Más filtros">
         <FilterIcon size={16} />
            Más filtros
      </Button>
    </section>
  );
}
