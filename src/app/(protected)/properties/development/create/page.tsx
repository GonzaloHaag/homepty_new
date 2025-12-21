import { FormPropertyDevelopment } from "@/components/property/development";
import { ErrorMessage } from "@/components/shared";
import { getAvailableUnitsForDevelopment } from "@/server/queries";

export default async function PropertiesDevelopmentCreatePage() {
  const response = await getAvailableUnitsForDevelopment();
  if (!response.ok || !response.data) {
    return (
      <ErrorMessage message="No se pudieron cargar las unidades disponibles para el desarrollo." />
    );
  }
  const availableUnits = response.data;
  return <FormPropertyDevelopment availableUnits={availableUnits} />;
}
