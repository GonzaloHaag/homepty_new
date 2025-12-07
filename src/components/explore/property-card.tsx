import { formatMoney } from "@/utils/formatters";
import { BathIcon, BedIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    image: string;
  };
}
export function PropertyCard({ property }: Props) {
  return (
    <Link href={"#"} className="group cursor-pointer transition-colors">
      <div className="p-4 flex gap-4">
        {/* Thumbnail */}
        <div className="w-32 h-24 shrink-0 overflow-hidden bg-muted relative">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform w-28 h-20"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="text-sm font-medium text-foreground line-clamp-1 mb-1">
              {property.title}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPinIcon size={12} />
              {property.location}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {formatMoney(property.price)}
            </span>
            <span className="text-xs text-muted-foreground">
              {property.area} m²
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <BedIcon size={12} />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <BathIcon size={12} />
              {property.bathrooms}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
