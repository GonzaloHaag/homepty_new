"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSiteRow } from "@/types/database-user-sites";
import { regenerateApiKeyAction } from "@/server/actions";
import { toast } from "sonner";
import { CopyIcon, KeyIcon, RefreshCwIcon, EyeIcon, EyeOffIcon } from "lucide-react";

interface Props {
  userSite: UserSiteRow;
}

export function ApiKeySection({ userSite }: Props) {
  const router = useRouter();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(userSite.cbf_api_key);
      setCopied(true);
      toast.success("API Key copiada al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
      toast.error("Error al copiar la API Key");
    }
  };

  const handleRegenerateApiKey = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de regenerar la API Key? Tu sitio satélite dejará de funcionar hasta que actualices la nueva clave."
    );

    if (!confirmed) return;

    setIsRegenerating(true);
    try {
      const result = await regenerateApiKeyAction();

      if (result.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error al regenerar la API Key:", error);
      toast.error("Error inesperado al regenerar la API Key");
    } finally {
      setIsRegenerating(false);
    }
  };

  const maskedApiKey = showApiKey
    ? userSite.cbf_api_key
    : `${userSite.cbf_api_key.substring(0, 12)}${"•".repeat(20)}`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <KeyIcon className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>API Key</CardTitle>
            <CardDescription>Clave para conectar tu sitio satélite</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={maskedApiKey}
              readOnly
              className="font-mono text-xs"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowApiKey(!showApiKey)}
              title={showApiKey ? "Ocultar" : "Mostrar"}
            >
              {showApiKey ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Usa esta clave en tu sitio satélite para conectarte al CBF
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyApiKey}
            className="w-full"
          >
            <CopyIcon className="h-4 w-4" />
            {copied ? "Copiado!" : "Copiar API Key"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerateApiKey}
            disabled={isRegenerating}
            className="w-full"
          >
            <RefreshCwIcon className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
            Regenerar API Key
          </Button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-900">
            <strong>⚠️ Importante:</strong> Guarda esta API Key de forma segura.
            Si la regeneras, deberás actualizar tu sitio satélite con la nueva clave.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
