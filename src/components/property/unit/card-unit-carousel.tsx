import { Card, CardContent } from "@/components/ui/card";
import { UnitWithImages } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

interface Props {
  unit: UnitWithImages;
}

export function CardUnitCarousel({ unit }: Props) {
  const imageUrl =
    unit.imagenes_unidades.length > 0
      ? unit.imagenes_unidades[0].image_url
      : "/images/placeholder.svg";

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={unit.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Price Tag */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
            <span className="text-sm font-bold text-gray-900">
              {formatMoney(unit.precio ?? 0)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {unit.nombre}
          </h3>
          
          <Link href={`/properties/unit/view/${unit.id}`} className="block">
            <Button className="w-full" variant="default">
              <EyeIcon className="w-4 h-4" />
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
