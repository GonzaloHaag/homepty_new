import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function TablePropertyRequests() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Operación</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Precio Min.</TableHead>
          <TableHead>Precio Máx</TableHead>
          <TableHead>Ciudad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>250.00</TableCell>
          <TableCell>SAN CARLOS</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
