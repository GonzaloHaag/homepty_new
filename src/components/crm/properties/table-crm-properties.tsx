import { ErrorMessage } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DevelopmentWithImages, QueryResponse, UnitWithImages } from "@/types";
import { TableRowCrmProperty } from "./table-row-crm-property";
interface Props {
  unitsPromise: Promise<QueryResponse<UnitWithImages[]>>;
  developmentsPromise: Promise<QueryResponse<DevelopmentWithImages[]>>;
}
export async function TableCrmProperties({
  unitsPromise,
  developmentsPromise,
}: Props) {
  const [unitsResponse, developmentsResponse] = await Promise.all([
    unitsPromise,
    developmentsPromise,
  ]);
  if (
    !unitsResponse.ok ||
    !developmentsResponse.ok ||
    !unitsResponse.data ||
    !developmentsResponse.data
  ) {
    return (
      <ErrorMessage message="Error al cargar las propiedades. Por favor, intenta de nuevo." />
    );
  }
  const properties = [...unitsResponse.data, ...developmentsResponse.data];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Operación</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No hay propiedades disponibles.
            </TableCell>
          </TableRow>
        ) : (
          properties.map((property, i) => (
            <TableRowCrmProperty
              key={`${property.id}-${i}`}
              property={property}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
