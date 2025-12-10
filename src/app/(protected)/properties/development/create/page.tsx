import { FormPropertyDevelopment } from "@/components/property/development";
import { getAvailableUnitsForDevelopment } from "@/server/queries/units";

export default async function PropertiesDevelopmentCreatePage() {
  const { data: availableUnits = [] } = await getAvailableUnitsForDevelopment();
  return <FormPropertyDevelopment availableUnits={availableUnits} />;
}
