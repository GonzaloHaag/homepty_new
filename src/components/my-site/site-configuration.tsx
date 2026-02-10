"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSiteRow } from "@/types/database-user-sites";
import { updateUserSiteAction } from "@/server/actions";
import { toast } from "sonner";
import { Loader2Icon, SettingsIcon } from "lucide-react";

interface Props {
  userSite: UserSiteRow;
}

export function SiteConfiguration({ userSite }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [siteName, setSiteName] = useState(userSite.site_name);
  const [subdomain, setSubdomain] = useState(userSite.subdomain || "");
  const [customDomain, setCustomDomain] = useState(userSite.custom_domain || "");
  const [primaryColor, setPrimaryColor] = useState(userSite.theme_config.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(userSite.theme_config.secondaryColor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateUserSiteAction({
        userSite: {
          site_name: siteName,
          subdomain: subdomain || null,
          custom_domain: customDomain || null,
          theme_config: {
            ...userSite.theme_config,
            primaryColor,
            secondaryColor,
          },
        },
      });

      if (result.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error al actualizar el sitio:", error);
      toast.error("Error inesperado al actualizar el sitio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Configuración del Sitio</CardTitle>
            <CardDescription>Personaliza tu sitio web</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name_edit">Nombre del Sitio</Label>
              <Input
                id="site_name_edit"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain_edit">Subdominio</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="subdomain_edit"
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  disabled={isLoading}
                  placeholder="mi-inmobiliaria"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  .homepty.com
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom_domain_edit">Dominio Personalizado (Opcional)</Label>
              <Input
                id="custom_domain_edit"
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                disabled={isLoading}
                placeholder="www.mipropiedades.com"
              />
              <p className="text-xs text-muted-foreground">
                Configura tu propio dominio (requiere configuración DNS)
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-medium text-sm">Colores del Tema</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary_color">Color Primario</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primary_color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    disabled={isLoading}
                    className="w-16 h-10"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    disabled={isLoading}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary_color">Color Secundario</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="secondary_color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    disabled={isLoading}
                    className="w-16 h-10"
                  />
                  <Input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    disabled={isLoading}
                    placeholder="#1E40AF"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Guardando cambios...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
