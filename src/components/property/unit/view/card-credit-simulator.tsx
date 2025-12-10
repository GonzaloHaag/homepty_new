import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UnitWithImages } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { CalculatorIcon } from "lucide-react";

interface Props {
  unit: UnitWithImages;
}
export function CardCreditSimulator({ unit }: Props) {
  return (
    <div className="w-full p-4 rounded border border-muted flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <CalculatorIcon size={20} className="text-primary" />
        <h4 className=" font-medium">Simulador de crédito hipotecario</h4>
      </div>
      <div className="flex flex-col items-center justify-center text-center bg-blue-50 p-4 rounded">
        <span className="text-sm text-gray-600">Enganche estimado (20%)</span>
        <span className="font-bold text-3xl text-blue-600">
          {formatMoney(unit.precio * 0.2)}
        </span>
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Valor de la propiedad:</TableCell>
            <TableCell className="text-right font-bold">
              {formatMoney(unit.precio)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Monto a financiar:</TableCell>
            <TableCell className="text-right font-bold">
              {formatMoney(unit.precio * 0.8)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pago mensual estimado:</TableCell>
            <TableCell className="text-right font-bold">
              {formatMoney(unit.precio * 0.008)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button className="w-full" variant={"outline"} title="Solicitar" disabled>
        Solicitar simulación completa
      </Button>
    </div>
  );
}
