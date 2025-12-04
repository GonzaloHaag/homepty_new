import { FormPropertyRequest } from "@/components/property-requests";
import { ButtonBack } from "@/components/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function RequestsCreatePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Crear solicitud</h1>
        <ButtonBack />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalla lo que búscas</CardTitle>
          <CardDescription>
            Mientras más específico seas, mejores opciones podremos ofrecerte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormPropertyRequest />
        </CardContent>
      </Card>
    </div>
  );
}
