import { SectionTabs, TabsSkeleton } from "@/components/real-state-applications";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function SolicitudesInmueblesPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Solicitudes de Inmuebles</h1>
        <Link
          href={"/solicitudes-inmuebles/crear"}
          title="Crear solicitud"
          className={buttonVariants({ variant: "default" })}
        >
          <PlusCircleIcon />
          Crear solicitud
        </Link>
      </div>
      <Separator />
      <Suspense fallback={<TabsSkeleton />}>
        <SectionTabs />
      </Suspense>
    </div>
  );
}
