/** TODO: Solucionar error de exportacion dinamica con el componente
 * SearchBox dentro de section filters
 */
import { AsideProperties, Map, SectionFilters } from "@/components/explore";
import { getAllDevelopments, getAllUnits } from "@/server/queries";
import { ErrorMessage } from "@/components/shared";

export default async function ExplorePage() {
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

  const properties = [...unitsResponse.data, ...developmentsResponse.data];

  return (
    <div className="flex flex-col gap-y-4">
      <SectionFilters />
      <div className="grid grid-cols-3">
        <div className="col-span-2 w-full min-h-[500px]">
          <Map />
        </div>
        <AsideProperties properties={properties} />
      </div>
    </div>
  );
}
