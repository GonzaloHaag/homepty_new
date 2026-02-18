import { Suspense } from "react";
import { getUserSite } from "@/server/queries";
import { MySiteContent } from "@/components/my-site/my-site-content";
import { MySiteSkeleton } from "@/components/my-site/my-site-skeleton";

export default async function MySitePage() {
  const userSitePromise = getUserSite();

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-semibold">Mi Sitio Web</h1>
        <p className="text-muted-foreground text-sm max-w-4xl text-pretty">
          Gestiona tu sitio web personalizado conectado al ecosistema Homepty.
          Configura tu dominio, personaliza tu marca y controla tu presencia en línea.
        </p>
      </div>

      <Suspense fallback={<MySiteSkeleton />}>
        <MySiteContent userSitePromise={userSitePromise} />
      </Suspense>
    </div>
  );
}
