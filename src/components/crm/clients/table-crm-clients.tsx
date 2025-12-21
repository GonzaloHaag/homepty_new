import { ErrorMessage } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client, QueryResponse } from "@/types";
import { TableRowCrmClient } from "./table-row-crm-client";
interface Props {
  clientsPromise: Promise<QueryResponse<Client[]>>;
}
export async function TableCrmClients({ clientsPromise }: Props) {
  const response = await clientsPromise;
  if (!response.ok || !response.data) {
    return (
      <ErrorMessage message="Error al cargar los clientes. Por favor intenta nuevamente" />
    );
  }
  const clients = response.data;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>RFC</TableHead>
          <TableHead>Presupuesto</TableHead>
          <TableHead>Fecha de alta</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No hay clientes disponibles.
            </TableCell>
          </TableRow>
        ) : (
          clients.map((client) => (
            <TableRowCrmClient key={client.id_cliente} client={client} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
