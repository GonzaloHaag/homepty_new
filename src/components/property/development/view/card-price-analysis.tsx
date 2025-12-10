import { DevelopmentWithImages } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { TrendingUpIcon } from "lucide-react";

interface Props {
  development: DevelopmentWithImages;
}

export function CardPriceAnalysis({ development }: Props) {
  const pricePerM2 = Math.round(development.precio / development.area);

  return (
    <div className="w-full p-4 rounded border border-muted flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <TrendingUpIcon size={20} className="text-primary" />
        <h4 className="font-medium">Análisis de precio</h4>
      </div>

      <div className="flex flex-col items-center justify-center text-center bg-blue-50 p-4 rounded">
        <span className="text-sm text-gray-600">Precio por m²</span>
        <span className="font-bold text-3xl text-blue-600">
          {formatMoney(pricePerM2)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Área total:</span>
          <span className="font-medium">
            {development.area} m<sup>2</sup>
          </span>
        </div>
        {development.area_construida && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Área construida:</span>
            <span className="font-medium">
              {development.area_construida} m<sup>2</sup>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Valor estimado:</span>
          <span className="font-medium">{formatMoney(development.precio)}</span>
        </div>
      </div>

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
