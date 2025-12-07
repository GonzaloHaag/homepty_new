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
import {
  CITIES_NAMES_BY_ID,
  formatMoney,
  NAME_TYPE_PROPERTY_BY_ID,
  STATES_NAMES_BY_ID,
} from "@/utils/formatters";
import { DialogViewRequest } from "./dialog-view-request";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { PencilIcon } from "lucide-react";
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
          <TableHead>Precio Min</TableHead>
          <TableHead>Precio Máx</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Ciudad</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.tipo_operacion}</TableCell>
            <TableCell>
              {NAME_TYPE_PROPERTY_BY_ID[request.tipo_propiedad_id]}
            </TableCell>
            <TableCell>{formatMoney(request.presupuesto_min!)}</TableCell>
            <TableCell>{formatMoney(request.presupuesto_max!)}</TableCell>
            <TableCell>{STATES_NAMES_BY_ID[request.id_estado]}</TableCell>
            <TableCell>{CITIES_NAMES_BY_ID[request.id_ciudad!]}</TableCell>
            <TableCell>
              {/* Actions such as Edit/Delete can be placed here */}
              <DialogViewRequest request={request} />
              <Link href={`/requests/edit/${request.id}`} title="Editar" className={`ml-2 ${buttonVariants({ variant: "outline", size: "icon" })}`}>
                <PencilIcon className="text-green-600" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
