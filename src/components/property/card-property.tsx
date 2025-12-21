import Link from "next/link";
import Image from "next/image";
import {
  BarChart3Icon,
  BathIcon,
  BedDoubleIcon,
  Grid2x2Icon,
  MapPinIcon,
  SquareIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  CITIES_NAMES_BY_ID,
  formatMoney,
  NAME_TYPE_ACTION_BY_ID,
  STATES_NAMES_BY_ID,
} from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "./favorite-button";
import { PropertyWithImages } from "@/types";
interface Props {
  property: PropertyWithImages;
}
export function CardProperty({ property }: Props) {
  const imageUrl =
    property.imagenes_propiedades.length > 0
      ? property.imagenes_propiedades[0].image_url
      : "/images/placeholder.svg";
  const calculateM2Price = () => {
    if (property.area_construida && property.area_construida > 0) {
      return formatMoney(property.precio / property.area_construida);
    }
    return 0;
  };
  return (
    <Link
      href={`/properties/${property.is_unit ? "unit" : "development"}/view/${
        property.id
      }`}
      title={property.nombre}
      className="group flex flex-col h-full border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-card overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt="Departamento en renta en Real de Juriquilla"
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <Badge>{NAME_TYPE_ACTION_BY_ID[property.id_tipo_accion]}</Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge className="property-badge property-badge-type">
            {property.tipo}
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-slate-50 p-2 rounded">
          <span className="text-sm font-bold text-foreground">
            {formatMoney(property.precio)}
          </span>
          <span className="block text-xs text-muted-foreground">{`${calculateM2Price()}/m²`}</span>
        </div>

        {/* Favorite Button */}
        <FavoriteButton />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-2 mb-1">
          {property.nombre}
        </h3>

        {/* Location */}
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPinIcon className="w-4 h-4 mr-1 shrink-0" />
          <span className="text-sm truncate">
            {`${CITIES_NAMES_BY_ID[property.id_ciudad]}, ${
              STATES_NAMES_BY_ID[property.id_estado]
            }`}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <BedDoubleIcon className="w-4 h-4" />
            {property.habitaciones ?? 0}
          </div>
          <div className="flex items-center gap-1.5">
            <BathIcon className="w-4 h-4" />
            {property.banios ?? 0}
          </div>
          <div className="flex items-center gap-1.5">
            <SquareIcon className="w-4 h-4" />
            <span>{property.area ?? 0} m²</span>
          </div>
          {!property.is_unit && (
            <div className="flex items-center gap-1.5">
              <Grid2x2Icon className="w-4 h-4" />
              <span>{property.area_construida ?? 0} m²</span>
            </div>
          )}
        </div>

        {/* Market Intelligence Section */}
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3Icon className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Inteligencia de Mercado
            </span>
            <div className="ml-auto flex items-center gap-1 text-success">
              <TrendingUpIcon className="w-3 h-3" />
              <span className="text-xs font-semibold">+12% anual</span>
            </div>
          </div>

          {/* Bottom metrics */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="text-success">●</span>
              <span>ROI: 14%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary">↗</span>
              <span>Cap Rate: 6.5%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-warning">◷</span>
              <span>Inventario: 2 meses</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
