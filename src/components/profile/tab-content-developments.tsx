"use client";
import { ChangeEvent, use, useState } from "react";
import { TYPES_OF_DEVELOPMENTS } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { TabsContent } from "../ui/tabs";
import { PropertyWithImages, QueryResponse } from "@/types";
import { ErrorMessage } from "../shared";
import { CardProperty } from "../property";
interface Props {
  developmentsPromise: Promise<QueryResponse<PropertyWithImages[]>>;
}
export function TabContentDevelopments({ developmentsPromise }: Props) {
  const response = use(developmentsPromise);
  const [filterType, setFilterType] = useState<string>("");
  if (!response.ok || !response.data) {
    return (
      <ErrorMessage message="Error al cargar los desarrollos. Por favor, inténtalo de nuevo más tarde." />
    );
  }
  const developments = response.data.filter((property) => property.is_unit === false);
  const filteredDevelopments =
    filterType === ""
      ? developments
      : developments.filter((development) => development.tipo === filterType);
  const onChangeFilterType = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };
  return (
    <TabsContent value="my-developments">
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-0">
            <h4 className="text-lg font-medium">Mis desarrollos</h4>
            <span className="text-sm text-muted-foreground">
              {developments.length} desarrollos
            </span>
          </div>
          <NativeSelect value={filterType} onChange={onChangeFilterType} className="w-full min-w-44">
            <NativeSelectOption value="">Todos los tipos</NativeSelectOption>
            {TYPES_OF_DEVELOPMENTS.map((type) => (
              <NativeSelectOption key={type.id} value={type.value}>
                {type.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDevelopments.length === 0 ? (
            <span className="text-gray-500 text-sm">No hay desarrollos que mostrar.</span>
          ) : (
            filteredDevelopments.map((development) => (
              <CardProperty key={development.id} property={development} />
            ))
          )}
        </section>
      </div>
    </TabsContent>
  );
}
