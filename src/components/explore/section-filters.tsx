"use client";
import { FilterIcon, SearchIcon } from "lucide-react";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { TYPES_OF_PROPERTIES } from "@/utils/constants";
import { Button } from "../ui/button";

export function SectionFilters() {
  return (
    <section className="flex items-center gap-x-2">
      <form className="flex items-center gap-x-4 w-full">
        <div className="w-full">
          {/* <SearchBox
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
            options={{ language: "es", country: "MX" }}
          /> */}
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
