import { DevelopmentWithImages, UnitWithImages } from "@/types";
import { CITIES_NAMES_BY_ID, formatMoney, STATES_NAMES_BY_ID } from "@/utils/formatters";
import { isUnit } from "@/utils/type-guards";
import { BathIcon, BedIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  property: UnitWithImages | DevelopmentWithImages;
}



export function PropertyCard({ property }: Props) {
  const imageUrl = isUnit(property)
    ? property.imagenes_unidades[0]?.image_url
    : property.imagenes_desarrollos[0]?.image_url;

  return (
    <Link href={`${isUnit(property) ? `/properties/unit/view/${property.id}` : `/properties/development/view/${property.id}`}`} className="group cursor-pointer transition-colors">
      <div className="p-4 flex gap-4">
        {/* Thumbnail */}
        <div className="w-32 h-24 shrink-0 overflow-hidden bg-muted relative">
          <Image
            src={imageUrl || "/images/placeholder.svg"}
            alt={property.nombre}
            fill
            sizes="128px"
            className="object-cover group-hover:scale-105 transition-transform w-28 h-20"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1">
              {property.nombre}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPinIcon size={12} />
              {STATES_NAMES_BY_ID[property.id_estado]} - {CITIES_NAMES_BY_ID[property.id_ciudad]}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {formatMoney(property.precio ?? 0)}
            </span>
            <span className="text-xs text-muted-foreground">
              {property.area} m²
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <BedIcon size={12} />
              {property.banios ?? 0}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <BathIcon size={12} />
              {property.habitaciones ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
