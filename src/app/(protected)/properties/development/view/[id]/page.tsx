import { SectionLeft, SectionRight } from "@/components/property/development";
import { ErrorMessage } from "@/components/shared";
import { getPropertyById } from "@/server/queries";
import Image from "next/image";

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

  const mainImage =
    development.imagenes_propiedades.length > 0
      ? development.imagenes_propiedades[0].image_url
      : "/images/placeholder.svg";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 p-6">
        <section className="flex flex-col gap-y-6">
          {/** Seccion de imagenes */}
          <div className="grid grid-cols-3 gap-6">
            {/** Imagen principal */}
            <div className="min-h-96 w-full col-span-2 relative">
              <Image
                src={mainImage}
                alt="Main image"
                layout="fill"
                objectFit="cover"
                loading="eager"
              />
            </div>
            {/** Imagenes secundarias */}
            <div className="w-full h-full flex flex-col gap-y-4">
              <div className="w-full h-1/2 bg-gray-200 animate-pulse" />
              <div className="w-full h-1/2 bg-gray-200 animate-pulse" />
            </div>
          </div>
          {/** Seccion de informacion */}
          <div className="grid grid-cols-3 gap-6">
            {/** Section left */}
            <SectionLeft development={development} />
            {/** Section right */}
            <SectionRight development={development} />
          </div>
        </section>
      </div>
    </div>
  );
}
