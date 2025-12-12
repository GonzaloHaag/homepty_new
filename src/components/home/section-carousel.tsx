import { QueryResponse, UnitWithImages } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ErrorMessage } from "../shared";
import { CardUnitCarousel } from "../property/unit";
interface Props {
  unitsPromise: Promise<QueryResponse<UnitWithImages[]>>;
}
export async function SectionCarousel({ unitsPromise }: Props) {
  const unitsResponse = await unitsPromise;
  if (!unitsResponse.ok || !unitsResponse.data) {
    return <ErrorMessage message="Error al obtener las unidades" />;
  }
  const units = unitsResponse.data;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {units.length === 0 ? (
          <span className="text-gray-500">No hay unidades disponibles</span>
        ) : (
          units.map((unit) => (
            <CarouselItem
              key={unit.id}
              className="basis-full md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <CardUnitCarousel unit={unit} />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
