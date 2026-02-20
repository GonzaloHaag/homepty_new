"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Globe, Loader2, AlertCircle } from "lucide-react";

interface CustomDomainManagerProps {
  userId: string;
  currentDomain?: string | null;
  verified?: boolean;
}

export function CustomDomainManager({
  userId,
  currentDomain,
  verified = false,
}: CustomDomainManagerProps) {
  const [domain, setDomain] = useState(currentDomain || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVerified, setIsVerified] = useState(verified);

  const handleAddDomain = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CBF_API_URL}/api/cbf/admin/add-custom-domain`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-cbf-admin-api-key": process.env.NEXT_PUBLIC_CBF_ADMIN_API_KEY!,
          },
          body: JSON.stringify({
            user_id: userId,
            custom_domain: domain,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add domain");
      }

      setSuccess(
        "¡Dominio agregado exitosamente! Por favor configura tu DNS."
      );
    } catch (err: any) {
      setError(err.message || "Error al agregar el dominio. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDomain = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CBF_API_URL}/api/cbf/admin/verify-domain`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-cbf-admin-api-key": process.env.NEXT_PUBLIC_CBF_ADMIN_API_KEY!,
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify domain");
      }

      if (data.verified) {
        setSuccess("¡Dominio verificado exitosamente!");
        setIsVerified(true);
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setError(
          "El dominio aún no está verificado. Por favor verifica tu configuración DNS."
        );
      }
    } catch (err: any) {
      setError(err.message || "Error al verificar el dominio. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Dominio Personalizado</CardTitle>
            <CardDescription>
              Configura tu propio dominio para tu sitio web
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input de dominio */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="tudominio.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            disabled={loading || isVerified || !!currentDomain}
            className="flex-1"
          />
          {!currentDomain && (
            <Button onClick={handleAddDomain} disabled={loading || !domain}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Agregar"
              )}
            </Button>
          )}
          {currentDomain && !isVerified && (
            <Button onClick={handleVerifyDomain} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verificar"
              )}
            </Button>
          )}
        </div>

        {/* Estado del dominio */}
        {currentDomain && (
          <div className="flex items-center gap-2">
            {isVerified ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">
                  Dominio verificado y activo
                </span>
                <Badge variant="default">Activo</Badge>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-yellow-600">
                  Pendiente de verificación
                </span>
                <Badge variant="secondary">Pendiente</Badge>
              </>
            )}
          </div>
        )}

        {/* Mensajes de error/éxito */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Instrucciones DNS */}
        {currentDomain && !isVerified && (
          <Alert>
            <AlertDescription>
              <strong>Configura tu DNS:</strong>
              <br />
              <br />
              <strong>Opción A: Nameservers (Recomendado)</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>ns1.vercel-dns.com</li>
                <li>ns2.vercel-dns.com</li>
              </ul>
              <br />
              <strong>Opción B: Registro CNAME</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Nombre: @ (o tu dominio)</li>
                <li>Valor: cname.vercel-dns.com</li>
              </ul>
              <br />
              <p className="text-xs text-muted-foreground mt-2">
                Los cambios DNS pueden tardar hasta 48 horas en propagarse.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Información adicional */}
        {!currentDomain && (
          <Alert>
            <AlertDescription>
              <strong>¿Por qué usar un dominio personalizado?</strong>
              <br />
              <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                <li>Refuerza tu marca profesional</li>
                <li>Mejora la confianza de tus clientes</li>
                <li>Mejor posicionamiento en buscadores (SEO)</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
