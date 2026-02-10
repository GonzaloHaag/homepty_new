"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserSiteAction } from "@/server/actions";
import { toast } from "sonner";
import { GlobeIcon, Loader2Icon } from "lucide-react";

export function CreateSiteCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [subdomain, setSubdomain] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createUserSiteAction({
        userSite: {
          site_name: siteName,
          subdomain: subdomain || undefined,
        },
      });

      if (result.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error al crear el sitio:", error);
      toast.error("Error inesperado al crear el sitio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <GlobeIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Crea tu Sitio Web</CardTitle>
            <CardDescription>
              Configura tu sitio web personalizado conectado al ecosistema Homepty
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site_name">Nombre del Sitio *</Label>
            <Input
              id="site_name"
              type="text"
              placeholder="Mi Inmobiliaria"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              El nombre de tu sitio web (visible para tus clientes)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subdomain">Subdominio (Opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="subdomain"
                type="text"
                placeholder="mi-inmobiliaria"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                disabled={isLoading}
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                .homepty.com
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Tu sitio estará disponible en: {subdomain || "tu-subdominio"}.homepty.com
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-sm text-blue-900 mb-2">
              ¿Qué obtienes con tu sitio web?
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ Sitio web personalizado con tu marca</li>
              <li>✓ Conexión automática con tus propiedades</li>
              <li>✓ Análisis de mercado con Homepty Brain</li>
              <li>✓ Dominio personalizado (configurable después)</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !siteName}>
            {isLoading ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                Creando sitio...
              </>
            ) : (
              "Crear Mi Sitio Web"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
