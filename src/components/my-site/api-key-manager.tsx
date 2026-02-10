"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  RotateCw, 
  AlertTriangle,
  CheckCircle2,
  Info
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApiKeyManagerProps {
  apiKey: string;
  onRegenerate: () => Promise<string>;
  isRegenerating?: boolean;
}

export function ApiKeyManager({ apiKey, onRegenerate, isRegenerating = false }: ApiKeyManagerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);

  const maskedKey = apiKey.slice(0, 12) + '•'.repeat(apiKey.length - 12);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const handleRegenerate = async () => {
    try {
      const newKey = await onRegenerate();
      setNewApiKey(newKey);
      setShowRegenerateDialog(false);
      // Mostrar el nuevo key por 10 segundos
      setTimeout(() => setNewApiKey(null), 10000);
    } catch (error) {
      console.error('Error al regenerar:', error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key
              </CardTitle>
              <CardDescription>
                Clave de autenticación para tu sitio satélite
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRegenerateDialog(true)}
              disabled={isRegenerating}
            >
              <RotateCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
              Regenerar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Alerta de nuevo API Key */}
          {newApiKey && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">¡API Key regenerada exitosamente!</AlertTitle>
              <AlertDescription className="text-green-700">
                <p className="mb-2">Tu nueva API Key es:</p>
                <code className="block bg-green-100 p-2 rounded text-sm break-all">
                  {newApiKey}
                </code>
                <p className="mt-2 text-xs">
                  Asegúrate de copiarla ahora. Por seguridad, no podrás verla de nuevo.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Input de API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">Tu API Key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="apiKey"
                  type="text"
                  value={isVisible ? apiKey : maskedKey}
                  readOnly
                  className="pr-10 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {isVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <Button
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Esta clave se usa para autenticar las peticiones de tu sitio satélite al CBF.
            </p>
          </div>

          {/* Instrucciones de uso */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Cómo usar tu API Key</AlertTitle>
            <AlertDescription className="space-y-2 text-sm">
              <p>
                Configura esta API Key en el archivo <code className="bg-gray-100 px-1 rounded">.env.local</code> de tu sitio satélite:
              </p>
              <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">
{`VITE_CBF_API_URL=https://cbf.homepty.com/api/cbf
VITE_CBF_API_KEY=${apiKey}`}
              </pre>
            </AlertDescription>
          </Alert>

          {/* Advertencia de seguridad */}
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Importante: Mantén tu API Key segura</AlertTitle>
            <AlertDescription className="text-red-700 text-sm">
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>No compartas tu API Key públicamente</li>
                <li>No la incluyas en el código fuente del repositorio</li>
                <li>Usa variables de entorno para almacenarla</li>
                <li>Si crees que fue comprometida, regenerala inmediatamente</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Dialog de confirmación para regenerar */}
      <Dialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              ¿Regenerar API Key?
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                Esta acción generará una nueva API Key y la anterior dejará de funcionar inmediatamente.
              </p>
              <p className="font-semibold text-orange-600">
                Tu sitio satélite dejará de funcionar hasta que actualices la nueva API Key en su configuración.
              </p>
              <p>
                ¿Estás seguro de que quieres continuar?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRegenerateDialog(false)}
              disabled={isRegenerating}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleRegenerate}
              disabled={isRegenerating}
            >
              {isRegenerating ? (
                <>
                  <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                  Regenerando...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Sí, Regenerar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
