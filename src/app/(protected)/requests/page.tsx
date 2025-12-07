import { SectionFilters, TableRequests } from "@/components/requests";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getRequests } from "@/server/queries";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function RequestsPage() {
  const requestsPromise = getRequests();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Solicitudes de Inmuebles</h1>
        <Link
          href={"/requests/create"}
          title="Crear solicitud"
          className={buttonVariants({ variant: "default" })}
        >
          <PlusCircleIcon />
          Crear solicitud
        </Link>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Todas las solicitudes</CardTitle>
          <CardDescription>
            Solicitudes de todas las categorías.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <SectionFilters />
          <Suspense fallback={<div>Cargando solicitudes...</div>}>
            <TableRequests requestsPromise={requestsPromise} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
