import { Suspense } from "react";
import { PlusIcon, Share2Icon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { TabContentUnits } from "./tab-content-units";
import { TabContentDevelopments } from "./tab-content-developments";
import {
  getAllDevelopmentsByCurrentUser,
  getAllUnitsByCurrentUser,
} from "@/server/queries";
export function SectionTabs() {
  const unitsPromise = getAllUnitsByCurrentUser();
  const developmentsPromise = getAllDevelopmentsByCurrentUser();
  return (
    <Tabs defaultValue="my-units" className="w-full">
      <section className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="my-units">Mis unidades</TabsTrigger>
          <TabsTrigger value="my-developments">Mis desarrollos</TabsTrigger>
          <TabsTrigger value="my-dashboard">Mi dashboard</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-x-2">
          <Button variant="outline" title="Compartir">
            <Share2Icon /> Compartir
          </Button>
          <Link
            href="/properties/create"
            title="Crear propiedad"
            className={buttonVariants({ variant: "default" })}
          >
            <PlusIcon /> Crear propiedad
          </Link>
        </div>
      </section>
      <Separator className="my-4" />
      <TabsContent value="my-units">
        <Suspense
          fallback={
            <span className="text-gray-500 text-sm">Cargando unidades...</span>
          }
        >
          <TabContentUnits unitsPromise={unitsPromise} />
        </Suspense>
      </TabsContent>
      <TabsContent value="my-developments">
        <Suspense
          fallback={
            <span className="text-gray-500 text-sm">
              Cargando desarrollos...
            </span>
          }
        >
          <TabContentDevelopments developmentsPromise={developmentsPromise} />
        </Suspense>
      </TabsContent>
      <TabsContent value="my-dashboard">
        <p className="text-pretty text-lg max-w-[640px]">
          <span className="text-primary font-semibold">Homepty</span> esta
          aprendiendo de ti, pronto podrás ver analitica, actividades clave,
          recomendaciones, planeacion estrategia y más. ¡Sigue asi!.
        </p>
      </TabsContent>
    </Tabs>
  );
}
