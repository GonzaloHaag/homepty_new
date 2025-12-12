import {
  CITIES_NAMES_BY_ID,
  formatMoney,
  NAME_REQUEST_STATUS,
  NAME_TYPE_PROPERTY_BY_ID,
} from "@/utils/formatters";
import { TableCell, TableRow } from "../ui/table";
import { Request } from "@/types";
import { buttonVariants } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { DialogViewRequest } from "./dialog-view-request";
import Link from "next/link";
interface Props {
  request: Request;
}
export function TableRowRequest({ request }: Props) {
  return (
    <TableRow>
      <TableCell>{request.tipo_operacion}</TableCell>
      <TableCell>
        {NAME_TYPE_PROPERTY_BY_ID[request.tipo_propiedad_id]}
      </TableCell>
      <TableCell className="font-medium">
        {formatMoney(request.presupuesto_min!)} - {formatMoney(request.presupuesto_max!)}
      </TableCell>
      <TableCell>{CITIES_NAMES_BY_ID[request.id_ciudad!]}</TableCell>
      <TableCell>{NAME_REQUEST_STATUS[request.estado_solicitud]}</TableCell>
      <TableCell>
        {/* Actions such as Edit/Delete can be placed here */}
        <DialogViewRequest request={request} />
        <Link
          href={`/requests/edit/${request.id}`}
          title="Editar"
          className={`ml-2 ${buttonVariants({
            variant: "outline",
            size: "icon",
          })}`}
        >
          <PencilIcon className="text-green-600" />
        </Link>
      </TableCell>
    </TableRow>
  );
}
