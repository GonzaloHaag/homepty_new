import { PropertyCard } from "./property-card";
import { DevelopmentWithImages, UnitWithImages } from "@/types";
interface Props {
  properties: (UnitWithImages | DevelopmentWithImages)[]
}
export async function AsideProperties({ properties }: Props) {
  return (
    <aside className="col-span-1 w-full flex flex-col gap-y-4 p-2 border border-gray-200 overflow-y-auto max-h-[500px]">
      {/* Aquí irán los resultados de las propiedades */}
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </aside>
  );
}
