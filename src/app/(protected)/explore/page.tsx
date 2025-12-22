/** TODO: Solucionar error de exportacion dinamica con el componente
 * SearchBox dentro de section filters
 */
import { AsideProperties, Map, SectionFilters } from "@/components/explore";
import { ErrorMessage } from "@/components/shared";
import { getAllPropertiesByCurrentUser } from "@/server/queries";

export default async function ExplorePage() {
  const response = await getAllPropertiesByCurrentUser();
  if (!response.ok || !response.data) {
    return <ErrorMessage message="Error al cargar las propiedades." />;
  }
  const properties = response.data;
  return (
    <div className="flex flex-col gap-y-4">
      <SectionFilters />
      <div className="grid grid-cols-1">
        <div className="w-full min-h-[500px]">
          <Map />
        </div>
        <AsideProperties properties={properties} />
      </div>
    </div>
  );
}
