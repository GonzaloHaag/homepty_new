import { PropertyViewTracker } from "@/components/property/view/property-view-tracker";
import { ErrorMessage } from "@/components/shared";
import { getPropertyById, getUnitsByDevelopmentId } from "@/server/queries";
import { getPropertyOwner, type PropertyOwner } from "@/components/property/view/property-owner-card";
import { DevelopmentViewLayout } from "@/components/property/development/view/development-view-layout";

export default async function PropertiesDevelopmentViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await getPropertyById({ id: Number(id) });
  if (!response.ok || !response.data) {
    return <ErrorMessage message={response.message} />;
  }
  const development = response.data;

  const ownerPromise = development.id_usuario
    ? getPropertyOwner(development.id_usuario)
    : Promise.resolve(null);
    
  const unitsPromise = getUnitsByDevelopmentId({ developmentId: Number(id) });

  const [owner, unitsResponse] = await Promise.all([ownerPromise, unitsPromise]);
  const units = unitsResponse.ok && unitsResponse.data ? unitsResponse.data : [];

  return (
    <>
      <PropertyViewTracker
        propertyId={id}
        propertyType="development"
        propertyName={development.nombre}
      />
      <DevelopmentViewLayout property={development} owner={owner as PropertyOwner | null} units={units} />
    </>
  );
}
