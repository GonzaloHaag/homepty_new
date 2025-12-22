import { ErrorMessage } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyWithImages, QueryResponse } from "@/types";
import { TableRowCrmProperty } from "./table-row-crm-property";
interface Props {
  propertiesPromise: Promise<QueryResponse<PropertyWithImages[]>>;
}
export async function TableCrmProperties({
  propertiesPromise,
}: Props) {
  const response = await propertiesPromise;
  if(!response.ok || !response.data) {
    return <ErrorMessage message="Error al cargar las propiedades." />;
  }
  const properties = response.data;
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
          properties.map((property) => (
            <TableRowCrmProperty
              key={property.id}
              property={property}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
