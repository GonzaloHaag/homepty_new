"use client";

import { useState } from "react";
import { QueryResponse } from "@/types";
import { UserSiteRow } from "@/types/database-user-sites";
import { CreateSiteCard } from "./create-site-card";
import { SiteOverview } from "./site-overview";
import { SiteConfiguration } from "./site-configuration";
import { SiteMetricsDashboard } from "./site-metrics-dashboard";
import { ThemeEditor } from "./theme-editor";
import { ApiKeyManager } from "./api-key-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Palette, Key, Settings } from "lucide-react";
import { updateSiteTheme, regenerateApiKey } from "@/server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  userSite: UserSiteRow | null;
}

export function MySiteContentClient({ userSite }: Props) {
  const router = useRouter();
  const [isSavingTheme, setIsSavingTheme] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Si el usuario no tiene un sitio, mostrar el formulario de creación
  if (!userSite) {
    return <CreateSiteCard />;
  }

  // Función para guardar el tema
  const handleSaveTheme = async (theme: any) => {
    setIsSavingTheme(true);
    try {
      const result = await updateSiteTheme(theme);
      if (result.success) {
        toast.success("Tema actualizado exitosamente");
        router.refresh();
      } else {
        toast.error(result.error || "Error al actualizar el tema");
      }
    } catch (error) {
      console.error("Error saving theme:", error);
      toast.error("Error inesperado al guardar el tema");
    } finally {
      setIsSavingTheme(false);
    }
  };

  // Función para regenerar API Key
  const handleRegenerateApiKey = async () => {
    setIsRegenerating(true);
    try {
      const result = await regenerateApiKey();
      if (result.success && result.data) {
        toast.success("API Key regenerada exitosamente");
        router.refresh();
        return result.data.newApiKey;
      } else {
        toast.error(result.error || "Error al regenerar la API Key");
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error regenerating API key:", error);
      toast.error("Error inesperado al regenerar la API Key");
      throw error;
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Vista general del sitio */}
      <SiteOverview userSite={userSite} />

      {/* Tabs para diferentes secciones */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Métricas</span>
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Tema</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">API Key</span>
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Configuración</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab de Métricas */}
        <TabsContent value="metrics" className="space-y-6">
          <SiteMetricsDashboard />
        </TabsContent>

        {/* Tab de Tema */}
        <TabsContent value="theme" className="space-y-6">
          <ThemeEditor
            currentTheme={userSite.theme_config as any}
            onSave={handleSaveTheme}
            isSaving={isSavingTheme}
          />
        </TabsContent>

        {/* Tab de API Key */}
        <TabsContent value="api" className="space-y-6">
          <ApiKeyManager
            apiKey={userSite.cbf_api_key}
            onRegenerate={handleRegenerateApiKey}
            isRegenerating={isRegenerating}
          />
        </TabsContent>

        {/* Tab de Configuración */}
        <TabsContent value="config" className="space-y-6">
          <SiteConfiguration userSite={userSite} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
