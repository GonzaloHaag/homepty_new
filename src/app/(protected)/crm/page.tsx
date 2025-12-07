import {
  CardCrm,
  ChartAnnualSalesStatistics,
  ChartLocationOfProperties,
  ChartProgressClosedProperties,
  ChartTypesOfProperties,
} from "@/components/crm";
import { Building2Icon, EyeIcon, HouseIcon, LayersIcon } from "lucide-react";

export default function CrmPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
        <CardCrm
          title={"Inmuebles en venta"}
          Icon={Building2Icon}
          quantity={20}
          description="Total de propiedades en venta"
          backgroundColor="bg-blue-600"
        />
        <CardCrm
          title="Imuebles en alquiler"
          Icon={HouseIcon}
          quantity={4}
          description="Total de propiedades en alquiler"
          backgroundColor="bg-green-600"
        />
        <CardCrm
          title="Visitas mensuales"
          Icon={EyeIcon}
          quantity={0}
          description="Total de visitas por mes"
          backgroundColor="bg-orange-600"
        />
        <CardCrm
          title="Total inmuebles"
          Icon={LayersIcon}
          quantity={24}
          description="Total de propiedades subidas"
          backgroundColor="bg-pink-700"
        />
      </div>
      <section className="grid grid-cols-2 gap-6">
        <ChartAnnualSalesStatistics />
        <ChartTypesOfProperties />
        <ChartLocationOfProperties />
        <ChartProgressClosedProperties />
      </section>
    </div>
  );
}
