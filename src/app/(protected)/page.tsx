import { Suspense } from "react";
import { Filters, SectionProperties } from "@/components/home";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllUnits } from "@/server/queries";

export default async function HomePage() {
  const unitsPromise = getAllUnits();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold">
          Encontrá las mejores propiedades
        </h1>
        <p className="text-muted-foreground text-sm max-w-4xl text-pretty">
          Explora nuestras propiedades populares y recomendadas, cuidadosamente
          seleccionadas para ti. Además, descubre una amplia variedad de
          opciones subidas por nuestra comunidad de usuarios.
        </p>
      </div>
      <Separator />
      <section className="flex flex-col gap-y-4">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList>
            <TabsTrigger value="popular" className="min-w-32">
              Populares
            </TabsTrigger>
            <TabsTrigger value="recommended" className="min-w-32">
              Recomendados
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            LIsta de propiedades populares aquí.
          </TabsContent>
          <TabsContent value="recommended">
            Lista de propiedades recomendadas aquí.
          </TabsContent>
        </Tabs>
      </section>
      <Filters />
      <Suspense fallback={<div>Cargando propiedades...</div>}>
        <SectionProperties unitsPromise={unitsPromise} />
      </Suspense>
    </div>
  );
}
