import { PropertyWithImages } from "@/types";
import { PropertyCard } from "./property-card";

interface Props {
  properties: PropertyWithImages[];
}
export async function AsideProperties({ properties }: Props) {
  return (
    <aside className="w-full flex items-center flex-wrap gap-4 p-2 border border-gray-200 overflow-y-auto max-h-[500px]">
      {/* Aquí irán los resultados de las propiedades */}
      {properties.length === 0 ? (
        <span className="text-gray-500 text-center text-sm">
          No hay propiedades para mostrar.
        </span>
      ) : (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      )}
    </aside>
  );
}
