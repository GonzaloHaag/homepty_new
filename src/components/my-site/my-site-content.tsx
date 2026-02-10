import { QueryResponse } from "@/types";
import { UserSiteRow } from "@/types/database-user-sites";
import { CreateSiteCard } from "./create-site-card";
import { SiteOverview } from "./site-overview";
import { SiteConfiguration } from "./site-configuration";
import { ApiKeySection } from "./api-key-section";

interface Props {
  userSitePromise: Promise<QueryResponse<UserSiteRow>>;
}

export async function MySiteContent({ userSitePromise }: Props) {
  const response = await userSitePromise;

  // Si el usuario no tiene un sitio, mostrar el formulario de creación
  if (!response.data) {
    return <CreateSiteCard />;
  }

  const userSite = response.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna izquierda: Vista general y configuración */}
      <div className="lg:col-span-2 space-y-6">
        <SiteOverview userSite={userSite} />
        <SiteConfiguration userSite={userSite} />
      </div>

      {/* Columna derecha: API Key y acciones */}
      <div className="space-y-6">
        <ApiKeySection userSite={userSite} />
      </div>
    </div>
  );
}
