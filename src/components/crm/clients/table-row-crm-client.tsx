import { TableCell, TableRow } from "@/components/ui/table";
import { Client } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { DialogClient } from "./dialog-client";
import { AlertDialogDelete } from "./alert-dialog-delete";
interface Props {
  client: Client;
}
export function TableRowCrmClient({ client }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{client.nombre_cliente}</TableCell>
      <TableCell>{client.email_cliente}</TableCell>
      <TableCell>{client.telefono_cliente}</TableCell>
      <TableCell>{client.dni_cif_cliente}</TableCell>
      <TableCell>
        {client.presupuesto_desde_cliente
          ? formatMoney(client.presupuesto_desde_cliente)
          : "0"}{" "}
        -{" "}
        {client.presupuesto_hasta_cliente
          ? formatMoney(client.presupuesto_hasta_cliente)
          : "0"}
      </TableCell>
      <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
      <TableCell>
        <DialogClient client={client} />
        <AlertDialogDelete id={client.id_cliente} />
      </TableCell>
    </TableRow>
  );
}
