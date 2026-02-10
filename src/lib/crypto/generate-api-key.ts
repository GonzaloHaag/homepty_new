import crypto from "crypto";

/**
 * Genera una API Key única y segura para autenticar sitios satélite con el CBF
 * Formato: cbf_live_[32 caracteres aleatorios]
 * @returns API Key en formato string
 */
export function generateCBFApiKey(): string {
  const randomBytes = crypto.randomBytes(24);
  const apiKey = `cbf_live_${randomBytes.toString("base64url")}`;
  return apiKey;
}

/**
 * Valida el formato de una CBF API Key
 * @param apiKey - API Key a validar
 * @returns true si el formato es válido
 */
export function validateCBFApiKey(apiKey: string): boolean {
  const pattern = /^cbf_live_[A-Za-z0-9_-]{32}$/;
  return pattern.test(apiKey);
}

/**
 * Hashea una API Key para almacenamiento seguro (opcional, para mayor seguridad)
 * @param apiKey - API Key a hashear
 * @returns Hash SHA-256 de la API Key
 */
export function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
}
