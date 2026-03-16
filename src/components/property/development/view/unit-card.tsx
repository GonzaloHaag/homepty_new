import { PropertyWithImages } from "@/types";
import { formatMoney } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BedIcon, BathIcon, SquareIcon } from "lucide-react";

interface Props {
  unit: PropertyWithImages;
}

export function UnitCard({ unit }: Props) {
  const imageUrl =
    unit.imagenes_propiedades.length > 0
      ? unit.imagenes_propiedades[0].image_url
      : "/images/placeholder.svg";

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-primary/40 transition-all group flex flex-col sm:flex-row h-full">
      {/* Photo */}
      <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 bg-gray-100">
        <Image
          src={imageUrl}
          alt={unit.nombre}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-700 shadow-sm uppercase">
          {unit.tipo}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-base font-bold text-gray-800 line-clamp-2" title={unit.nombre}>
              {unit.nombre}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            {unit.area > 0 && (
                <div className="flex items-center gap-1" title="Área / Terreno">
                    <SquareIcon className="w-4 h-4 text-gray-400" />
                    <span>{unit.area} m²</span>
                </div>
            )}
            {unit.habitaciones > 0 && (
                <div className="flex items-center gap-1" title="Habitaciones">
                    <BedIcon className="w-4 h-4 text-gray-400" />
                    <span>{unit.habitaciones}</span>
                </div>
            )}
            {unit.banios > 0 && (
                <div className="flex items-center gap-1" title="Baños">
                    <BathIcon className="w-4 h-4 text-gray-400" />
                    <span>{unit.banios}</span>
                </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
          <div className="text-lg font-bold text-primary">
            {formatMoney(unit.precio || 0)}
          </div>
          <Link
            href={`/properties/unit/view/${unit.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-primary transition-colors group-hover:text-primary"
          >
            Ver detalles
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
