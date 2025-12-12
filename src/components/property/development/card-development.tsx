import Link from "next/link";
import Image from "next/image";
import {
  BathIcon,
  BedIcon,
  HeartIcon,
  MapPinIcon,
  SquareIcon,
} from "lucide-react";
import { DevelopmentWithImages } from "@/types";
import {
  CITIES_NAMES_BY_ID,
  formatMoney,
  STATES_NAMES_BY_ID,
} from "@/utils/formatters";
import { Button } from "@/components/ui/button";

interface Props {
  development: DevelopmentWithImages;
}
export function CardDevelopment({ development }: Props) {
  const imageUrl =
    development.imagenes_desarrollos.length > 0
      ? development.imagenes_desarrollos[0].image_url
      : "/images/placeholder.svg";
  return (
    <Link
      href={`/properties/development/view/${development.id}`}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 relative group min-h-[380px]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={development.nombre}
            className="w-full h-full object-cover aspect-square"
            fill
          />
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm">
            <span className="text-sm font-semibold text-gray-900">
              {formatMoney(development.precio ?? 0)}
            </span>
          </div>

          <Button
            size={"icon"}
            variant={"outline"}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm transition-all duration-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 hover:bg-gray-50"
          >
            <HeartIcon size={16} className="transition-colors" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base mb-0 truncate">
            {development.nombre}
          </h3>
          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon size={16} className="mr-1" />
            <span className="text-sm truncate">{`${
              STATES_NAMES_BY_ID[development.id_estado]
            }, ${CITIES_NAMES_BY_ID[development.id_ciudad]}`}</span>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4 mb-4 items-center">
            <div className="flex items-center text-gray-700">
              <BedIcon size={16} className="mr-2" />
              <span className="text-sm">
                {development.habitaciones ?? 0} hab.
              </span>
            </div>
            <div className="flex items-center justify-end text-gray-700">
              <BathIcon size={16} className="mr-2" />
              <span className="text-sm">
                {development.banios ?? 0}{" "}
                {development.banios === 1 ? "baño" : "baños"}
              </span>
            </div>
          </div>

          {/* Areas */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 pt-3">
              <SquareIcon size={16} className="mr-2" />
              <div className="text-xs flex gap-1">
                <div className="font-medium">{development.area ?? 0} m²</div>
                <span className="text-gray-500">Const</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 pt-3">
              <SquareIcon size={16} className="mr-2" />
              <div className="text-xs flex gap-1">
                <div className="font-medium">
                  {development.area_construida ?? 0} m²
                </div>
                <span className="text-gray-500">Cubie.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
