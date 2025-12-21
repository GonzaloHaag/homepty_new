import { Suspense } from "react";
import {
  DialogOffers,
  Filters,
  SectionProperties,
  SectionPropertiesSkeleton,
  SheetProfitabilityAnalysis,
} from "@/components/home";
import { Separator } from "@/components/ui/separator";
import { getAllProperties } from "@/server/queries";

export default async function HomePage(props: {
  searchParams?: Promise<{
    search?: string;
    type_operation?: string;
    type_property?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const typeOperation = searchParams?.type_operation || "";
  const typeProperty = searchParams?.type_property || "";
  const propertiesPromise = getAllProperties({
    search,
    type_operation: typeOperation,
    type_property: typeProperty,
  });
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
      {/* <section className="flex flex-col gap-y-4">
        <Tabs defaultValue="units_popular" className="w-full">
          <TabsList>
            <TabsTrigger value="units_popular" className="min-w-32">
              <HomeIcon /> Unidades populares
            </TabsTrigger>
            <TabsTrigger value="developments_popular" className="min-w-32">
              <Building2Icon /> Desarrollos populares
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="units_popular"
            className="w-full"
          >
            <SectionCarousel unitsPromise={unitsPopularPromise} />
          </TabsContent>
          <TabsContent value="developments_popular">
            <span className="text-gray-400">
              No hay desarrollos populares disponibles
            </span>
          </TabsContent>
        </Tabs>
      </section>
      <Separator /> */}
      <section className="w-full flex flex-col gap-4 bg-muted/50 p-4 rounded">
        <Filters />
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SheetProfitabilityAnalysis />
          <DialogOffers />
        </div>
      </section>
      <Suspense key={search} fallback={<SectionPropertiesSkeleton />}>
        <SectionProperties
          propertiesPromise={propertiesPromise}
        />
      </Suspense>
    </div>
  );
}
