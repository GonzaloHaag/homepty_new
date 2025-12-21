"use client";
import { FormEvent, useState } from "react";
import { TYPES_OF_OPERATIONS, TYPES_OF_PROPERTIES } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Button } from "../ui/button";
import { FilterIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SectionMoreFilters } from "./section-more-filters";

export function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    formData.forEach((value, key) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleShowMoreFilters = () => {
    setShowMoreFilters((prev) => !prev);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col md:flex-row flex-wrap items-center gap-4"
    >
      <div className="relative flex-1">
        <SearchIcon
          size={20}
          className="text-gray-200 absolute my-auto left-3 top-0 bottom-0"
        />
        <Input
          type="search"
          placeholder="Buscar por nombre, estado o ciudad..."
          className="w-full min-w-xs pl-10"
          name="search"
          defaultValue={searchParams.get("search")?.toString() ?? ""}
        />
      </div>
      <NativeSelect
        className="w-full md:w-48 flex-1"
        name="type_operation"
        defaultValue={searchParams.get("type_operation")?.toString() ?? ""}
      >
        <NativeSelectOption value="">Tipo de operación</NativeSelectOption>
        {TYPES_OF_OPERATIONS.map((operation) => (
          <NativeSelectOption key={operation.id} value={operation.value}>
            {operation.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <NativeSelect
        className="flex-1 w-full md:w-48"
        name="type_property"
        defaultValue={searchParams.get("type_property")?.toString() ?? ""}
      >
        <NativeSelectOption value="">Tipo de propiedad</NativeSelectOption>
        {TYPES_OF_PROPERTIES.map((type) => (
          <NativeSelectOption key={type.id} value={type.value}>
            {type.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Button
        type="button"
        title="Más filtros"
        variant={"outline"}
        className="flex-1 max-w-32"
        onClick={handleShowMoreFilters}
      >
        <FilterIcon size={16} />
        Más filtros
      </Button>
      <Button type="submit" title="Buscar" className="flex-1 max-w-32">
        <SearchIcon size={16} />
        Buscar
      </Button>
      <SectionMoreFilters showMoreFilters={showMoreFilters} />
    </form>
  );
}
