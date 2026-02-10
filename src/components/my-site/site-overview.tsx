"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserSiteRow } from "@/types/database-user-sites";
import { ExternalLinkIcon, GlobeIcon, PowerIcon } from "lucide-react";
import { toggleSiteStatusAction } from "@/server/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  userSite: UserSiteRow;
}

export function SiteOverview({ userSite }: Props) {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleStatus = async () => {
    setIsToggling(true);
    try {
      const result = await toggleSiteStatusAction({
        isActive: !userSite.is_active,
      });

      if (result.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error al cambiar el estado del sitio:", error);
      toast.error("Error inesperado al cambiar el estado");
    } finally {
      setIsToggling(false);
    }
  };

  const siteUrl = userSite.custom_domain
    ? `https://${userSite.custom_domain}`
    : userSite.subdomain
    ? `https://${userSite.subdomain}.homepty.com`
    : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GlobeIcon className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>{userSite.site_name}</CardTitle>
              <CardDescription>Vista general de tu sitio web</CardDescription>
            </div>
          </div>
          <Badge variant={userSite.is_active ? "default" : "secondary"}>
            {userSite.is_active ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">URL del Sitio</p>
            {siteUrl ? (
              <div className="flex items-center gap-2">
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {siteUrl}
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No configurado</p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Estado</p>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  userSite.is_active ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <p className="text-sm">
                {userSite.is_active ? "Sitio publicado" : "Sitio pausado"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleStatus}
            disabled={isToggling}
          >
            <PowerIcon className="h-4 w-4" />
            {userSite.is_active ? "Pausar Sitio" : "Activar Sitio"}
          </Button>
          {siteUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="h-4 w-4" />
                Visitar Sitio
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
