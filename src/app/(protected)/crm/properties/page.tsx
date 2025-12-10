import { Suspense } from "react";
import { TableCrmProperties } from "@/components/crm/properties";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDevelopmentsByCurrentUser,
  getUnitsByCurrentUser,
} from "@/server/queries";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function CrmPropertiesPage() {
  const unitsPromise = getUnitsByCurrentUser();
  const developmentsPromise = getDevelopmentsByCurrentUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de propiedades</CardTitle>
        <CardDescription>
          Aquí puedes ver y gestionar todas tus propiedades subidas a la
          plataforma.
        </CardDescription>
        <CardAction>
          <Link
            href={"/properties/create"}
            title="Crear propiedad"
            className={buttonVariants({ variant: "default" })}
          >
            <PlusIcon />
            Agregar propiedad
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Cargando propiedades...</div>}>
          <TableCrmProperties
            unitsPromise={unitsPromise}
            developmentsPromise={developmentsPromise}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
