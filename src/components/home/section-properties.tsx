import { DevelopmentWithImages, QueryResponse, UnitWithImages } from "@/types";
import { ErrorMessage } from "../shared";
import { CardUnit } from "../property/unit";
import { CardDevelopment } from "../property/development";

interface Props {
  /** Recibir la promesa de unidades y desarrollos */
  unitsPromise: Promise<QueryResponse<UnitWithImages[]>>;
  developmentsPromise: Promise<QueryResponse<DevelopmentWithImages[]>>;
}
export async function SectionProperties({
  unitsPromise,
  developmentsPromise,
}: Props) {
  const [unitsResponse, developmentsResponse] = await Promise.all([
    unitsPromise,
    developmentsPromise,
  ]);

  if (
    !unitsResponse.ok ||
    !unitsResponse.data ||
    !developmentsResponse.ok ||
    !developmentsResponse.data
  ) {
    return <ErrorMessage message="Error al cargar las propiedades" />;
  }

  const units = unitsResponse.data;
  const developments = developmentsResponse.data;

  const isEmpty = units.length === 0 && developments.length === 0;
  return (
    <section className="grid grid-cols-4 gap-4">
      {isEmpty ? (
        <span className="text-center col-span-4">
          No se encontraron propiedades.
        </span>
      ) : (
        <>
          {units.map((unit) => (
            <CardUnit key={unit.id} unit={unit} />
          ))}
          {developments.map((development) => (
            <CardDevelopment key={development.id} development={development} />
          ))}
        </>
      )}
    </section>
  );
}
