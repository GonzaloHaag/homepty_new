/** TODO: Solucionar error de exportacion dinamica con el componente
 * SearchBox dentro de section filters
 */
import { AsideProperties, Map, SectionFilters } from "@/components/explore";


export default function ExplorePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <SectionFilters />
      <div className="grid grid-cols-3">
        <div className="col-span-2 w-full min-h-[500px]">
          <Map />
        </div>
        <AsideProperties />
      </div>
    </div>
  );
}
