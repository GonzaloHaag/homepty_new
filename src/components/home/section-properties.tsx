import { QueryResponse, Unit } from "@/types";
import { ErrorMessage } from "../shared";
import { CardUnit } from "../property/unit";

interface Props {
  /** Recibir la promesa de unidades y desarrollos */
  unitsPromise: Promise<QueryResponse<Unit[]>>;
}
export async function SectionProperties({ unitsPromise }: Props) {
  const response = await unitsPromise;
  if (!response.ok || !response.data) {
    return <ErrorMessage message={response.message} />;
  }

  const units = response.data;
  return (
    <section className="grid grid-cols-4 gap-4">
      {units.length === 0 ? (
        <span className="text-center col-span-4">
          No se encontraron propiedades.
        </span>
      ) : (
        units.map((unit) => <CardUnit key={unit.id} unit={unit} />)
      )}
    </section>
  );
}
