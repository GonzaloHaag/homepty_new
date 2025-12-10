import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DevelopmentWithImages } from "@/types";
import {
  CITIES_NAMES_BY_ID,
  formatMoney,
  NAME_TYPE_ACTION_BY_ID,
  STATES_NAMES_BY_ID,
} from "@/utils/formatters";
import {
  BathIcon,
  BedIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  SquareIcon,
} from "lucide-react";
import { MapLocation } from "../../map-location";
import { DialogScheduleVisit } from "../../dialog-schedule-visit";

interface Props {
  development: DevelopmentWithImages;
}
export function SectionLeft({ development }: Props) {
  return (
    <section className="w-full col-span-2 flex flex-col gap-y-4">
      <div className="w-full p-4 rounded border border-muted flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <Badge variant={"default"}>{development.tipo}</Badge>
          <Badge variant={"outline"}>
            {NAME_TYPE_ACTION_BY_ID[development.id_tipo_accion]}
          </Badge>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-pretty text-xl">
              {development.nombre}
            </h4>
            <span className="font-bold text-2xl text-primary">
              {formatMoney(development.precio)}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPinIcon size={20} className="text-primary" />
            <span className="text-sm text-gray-500">{`${development.direccion}, ${
              STATES_NAMES_BY_ID[development.id_estado]
            }, ${CITIES_NAMES_BY_ID[development.id_ciudad]}`}</span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-x-2 text-gray-600">
            <BedIcon size={20} />
            <span className="text-sm">
              {development.habitaciones ?? 0} Habitaciones
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-gray-600">
            <BathIcon size={20} />
            <span className="text-sm">{development.banios ?? 0} Baños</span>
          </div>
          <div className="flex items-center gap-x-2 text-gray-600">
            <SquareIcon size={20} />
            <span className="text-sm">{development.area ?? 0} m² totales</span>
          </div>
          {development.area_construida && (
            <div className="flex items-center gap-x-2 text-gray-600">
              <HomeIcon size={20} />
              <span className="text-sm">
                {development.area_construida} m² construidos
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DialogScheduleVisit />
          <Button
            type="button"
            variant={"outline"}
            title="Llamar ahora"
            className="w-full"
          >
            <PhoneIcon size={20} />
            Llamar ahora
          </Button>
        </div>
      </div>
      <div className="w-full bg-card p-4 rounded flex flex-col gap-y-1 border border-muted ">
        <h4 className="font-medium text-pretty">Descripción</h4>
        {development.descripcion ? (
          <span className="text-sm text-gray-500 text-pretty">
            {development.descripcion}
          </span>
        ) : (
          <span className="text-sm text-gray-500 text-pretty">
            Lo sentimos, este desarrollo no tiene una descripción disponible.
          </span>
        )}
      </div>

      <div className="w-full bg-card rounded overflow-hidden h-full border border-muted">
        <MapLocation
          address={`${development.direccion}, ${
            development.colonia ? development.colonia + ", " : ""
          }${CITIES_NAMES_BY_ID[development.id_ciudad]}, ${
            STATES_NAMES_BY_ID[development.id_estado]
          }${development.codigo_postal ? ", CP " + development.codigo_postal : ""}`}
        />
      </div>
    </section>
  );
}
