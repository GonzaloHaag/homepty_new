import { TableCell, TableRow } from "@/components/ui/table";
import { Client } from "@/types";
import { formatMoney } from "@/utils/formatters";
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
          : "N/A"}{" "}
        -{" "}
        {client.presupuesto_hasta_cliente
          ? formatMoney(client.presupuesto_hasta_cliente)
          : "N/A"}
      </TableCell>
      <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
      <TableCell>
        {/* Aquí puedes agregar botones o enlaces para acciones como editar o ver detalles */}
        {/* Ejemplo: */}
        {/* <Link href={`/clients/view/${client.id_cliente}`} className={buttonVariants({ size:"icon", variant: "outline" })}>
                     <EyeIcon />
                  </Link> */}
      </TableCell>
    </TableRow>
  );
}
