import { QueryResponse } from "@/types";
import { UserSiteRow } from "@/types/database-user-sites";
import { SiteOverview } from "./site-overview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Globe, Info } from "lucide-react";

interface Props {
  userSitePromise: Promise<QueryResponse<UserSiteRow>>;
}

export async function MySiteContent({ userSitePromise }: Props) {
  const response = await userSitePromise;

  // Si el usuario NO tiene un sitio creado por el CBF
  if (!response.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="max-w-2xl w-full space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
              <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Aún no tienes un sitio web
            </h2>
            <p className="text-lg text-muted-foreground">
              Tu sitio web personalizado te permitirá mostrar tus propiedades a tus clientes con tu propia marca.
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>¿Cómo obtener tu sitio?</strong>
              <br />
              Contacta al equipo de Homepty para activar tu sitio web personalizado. 
              Una vez activado, podrás gestionarlo desde aquí.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Beneficios de tu sitio web</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <div>
                  <p className="font-medium">Marca Propia</p>
                  <p className="text-sm text-muted-foreground">
                    Tu sitio reflejará tu identidad profesional con tu logo, colores y dominio.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <div>
                  <p className="font-medium">Sincronización Automática</p>
                  <p className="text-sm text-muted-foreground">
                    Las propiedades que agregues aquí se mostrarán automáticamente en tu sitio.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <div>
                  <p className="font-medium">Inteligencia de Homepty</p>
                  <p className="text-sm text-muted-foreground">
                    Tu sitio estará conectado a Homepty Brain para análisis y recomendaciones.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const userSite = response.data;

  // Si el usuario SÍ tiene sitio - Mostrar vista de gestión
  return (
    <div className="space-y-6">
      {/* Vista general del sitio */}
      <SiteOverview userSite={userSite} />

      {/* Información adicional */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Próximamente:</strong> Podrás personalizar el tema, configurar SEO y ver métricas de tu sitio desde aquí.
        </AlertDescription>
      </Alert>
    </div>
  );
}
