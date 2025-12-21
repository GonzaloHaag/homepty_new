"use client";
import { ChangeEvent, use, useState } from "react";
import { TYPES_OF_UNITS } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { TabsContent } from "../ui/tabs";
import { PropertyWithImages, QueryResponse } from "@/types";
import { ErrorMessage } from "../shared";
import { CardProperty } from "../property";
interface Props {
  unitsPromise: Promise<QueryResponse<PropertyWithImages[]>>;
}
export function TabContentUnits({ unitsPromise }: Props) {
  const response = use(unitsPromise);
  const [filterType, setFilterType] = useState<string>("");
  if (!response.ok || !response.data) {
    return (
      <ErrorMessage message="Error al cargar las unidades. Por favor, inténtalo de nuevo más tarde." />
    );
  }
  const units = response.data.filter((property) => property.is_unit === true);
  const filteredUnits =
    filterType === ""
      ? units
      : units.filter((unit) => unit.tipo === filterType);
  const onChangeFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };
  return (
    <TabsContent value="my-units">
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-0">
            <h4 className="text-lg font-medium">Mis unidades</h4>
            <span className="text-sm text-muted-foreground">
              {units.length} unidades
            </span>
          </div>
          <NativeSelect value={filterType} onChange={onChangeFilterType} className="w-full min-w-44">
            <NativeSelectOption value="">Todos los tipos</NativeSelectOption>
            {TYPES_OF_UNITS.map((type) => (
              <NativeSelectOption key={type.id} value={type.value}>
                {type.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredUnits.length === 0 ? (
            <span className="text-gray-500 text-sm">No hay unidades que mostrar.</span>
          ) : (
            filteredUnits.map((unit) => (
              <CardProperty key={unit.id} property={unit} />
            ))
          )}
        </section>
      </div>
    </TabsContent>
  );
}
