import { Suspense } from "react";
import {
  DialogOffers,
  DialogValueEstimator,
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
    precioMin?: string;
    precioMax?: string;
    habitaciones?: string;
    banios?: string;
    estacionamientos?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filters = {
    search: searchParams?.search || "",
    type_operation: searchParams?.type_operation || "",
    type_property: searchParams?.type_property || "",
    precioMin: searchParams?.precioMin || "",
    precioMax: searchParams?.precioMax || "",
    habitaciones: searchParams?.habitaciones || "",
    banios: searchParams?.banios || "",
    estacionamientos: searchParams?.estacionamientos || "",
    page: searchParams?.page || "1",
  };
  const propertiesPromise = getAllProperties({ filters });
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
      <section className="w-full flex flex-col gap-4 bg-muted/50 p-4 rounded">
        <Filters />
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <SheetProfitabilityAnalysis />
          <DialogOffers />
          <DialogValueEstimator />
        </div>
      </section>
      <Suspense key={filters.search} fallback={<SectionPropertiesSkeleton />}>
        <SectionProperties propertiesPromise={propertiesPromise} />
      </Suspense>
    </div>
  );
}
