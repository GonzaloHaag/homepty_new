"use client";
import { ChangeEvent } from "react";
import { TYPES_OF_PROPERTIES, TYPES_STATUS_REQUEST } from "@/utils/constants";
import { Label } from "../ui/label";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SectionFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelect(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    const key = event.target.name;
    const params = new URLSearchParams(searchParams);
    if (value && value !== "todas" && value !== "0") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex items-center gap-x-4">
      <div className="flex flex-col gap-y-2 w-full max-w-44">
        <Label htmlFor="status">Estado</Label>
        <NativeSelect id="status" name="status" defaultValue={searchParams.get("status")?.toString() ?? "todas"} onChange={handleSelect}>
          <NativeSelectOption value={"todas"}>Todas</NativeSelectOption>
          {TYPES_STATUS_REQUEST.map((state) => (
            <NativeSelectOption key={state.value} value={state.value}>
              {state.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="flex flex-col gap-y-2 w-full max-w-44">
        <Label htmlFor="tipo_propiedad_id">Tipo de propiedad</Label>
        <NativeSelect
          id="tipo_propiedad_id"
          name="tipo_propiedad_id"
          defaultValue={searchParams.get("tipo_propiedad_id")?.toString() ?? "0"}
          onChange={handleSelect}
        >
          <NativeSelectOption value={0}>Todas</NativeSelectOption>
          {TYPES_OF_PROPERTIES.map((type) => (
            <NativeSelectOption key={type.value} value={type.value}>
              {type.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
    </section>
  );
}
