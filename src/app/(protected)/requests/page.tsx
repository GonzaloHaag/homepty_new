import { SectionTabs, TabsSkeleton } from "@/components/property-requests";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function RequestsPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Solicitudes de Inmuebles</h1>
        <Link
          href={"/property-requests/create"}
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
