import { getAllDevelopments, getAllUnits } from "@/server/queries";
import { ErrorMessage } from "../shared";
import { PropertyCard } from "./property-card";

export async function AsideProperties() {
  const [unitsResponse, developmentsResponse] = await Promise.all([
    getAllUnits(),
    getAllDevelopments(),
  ]);

  if (
    !unitsResponse.ok ||
    !developmentsResponse.ok ||
    !unitsResponse.data ||
    !developmentsResponse.data
  ) {
    return <ErrorMessage message="Error al cargar las propiedades." />;
  }
   const properties = [
     ...unitsResponse.data,
      ...developmentsResponse.data,
   ];

  return (
    <aside className="col-span-1 w-full flex flex-col gap-y-4 p-2 border border-gray-200 overflow-y-auto max-h-[500px]">
      {/* Aquí irán los resultados de las propiedades */}
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </aside>
  );
}
