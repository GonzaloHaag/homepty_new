import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function UserInfoSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2 flex-1">
          {/* Nombre del usuario */}
          <Skeleton className="h-6 w-40" />
          {/* Descripción */}
          <Skeleton className="h-4 w-64" />
        </div>
        {/* Botón de editar */}
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      <div className="flex flex-col gap-y-2">
        {/* Estado */}
        <div className="flex items-center gap-x-2 text-sm">
          <MapPinIcon size={20} className="text-gray-300" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Teléfono */}
        <div className="flex items-center gap-x-2 text-sm">
          <PhoneIcon size={20} className="text-gray-300" />
          <Skeleton className="h-4 w-36" />
        </div>
        {/* Email */}
        <div className="flex items-center gap-x-2 text-sm">
          <MailIcon size={20} className="text-gray-300" />
          <Skeleton className="h-4 w-48" />
        </div>
        {/* Actividad */}
        <div className="flex items-center gap-x-2 text-sm">
          <MailIcon size={20} className="text-gray-300" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
