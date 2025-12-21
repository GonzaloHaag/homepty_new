import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Property } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { TrendingUpIcon } from "lucide-react";
interface Props {
  unit: Property
}
export function CardPriceAnalysis({ unit }: Props) {
  return (
    <div className="w-full p-4 rounded border border-muted flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <TrendingUpIcon size={20} className="text-primary" />
        <h4 className="font-medium">Análisis de precio</h4>
      </div>

      <div className="flex flex-col items-center justify-center text-center bg-blue-50 p-4 rounded">
        <span className="text-sm text-gray-600">Precio por m²</span>
        <span className="font-bold text-3xl text-blue-600 ">
          {formatMoney(Math.round(unit.precio / unit.area))}
        </span>
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Área total:</TableCell>
            <TableCell className="text-right font-bold">
              {unit.area ?? 0} m²
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Valor estimado:</TableCell>
            <TableCell className="text-right font-bold">
              {formatMoney(unit.precio)}
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

      <div className="flex items-center gap-x-2 text-sm text-gray-600 pt-2 border-t border-muted">
        <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        </div>
        <span>Precio competitivo en la zona</span>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded p-3">
        <p className="text-sm text-orange-700">
          Servicio de valuación no disponible. Por favor intente más tarde.
        </p>
      </div>
    </div>
  );
}
