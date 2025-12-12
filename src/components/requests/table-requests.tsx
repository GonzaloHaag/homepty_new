"use server";
import { QueryResponse, Request } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ErrorMessage } from "../shared";
import { TableRowRequest } from "./table-row-request";
interface Props {
  requestsPromise: Promise<QueryResponse<Request[]>>;
}
export async function TableRequests({ requestsPromise }: Props) {
  const response = await requestsPromise;
  if (!response.ok || !response.data) {
    return <ErrorMessage message="Error al cargar las solicitudes" />;
  }
  const requests = response.data;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Operación</TableHead>
          <TableHead>Tipo propiedad</TableHead>
          <TableHead>Rango de Precio</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No hay solicitudes disponibles.
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => (
            <TableRowRequest key={request.id} request={request} />
          ))
        )}
      </TableBody>
    </Table>
  );
}
