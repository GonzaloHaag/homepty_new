import { FormRequest } from "@/components/requests";
import { ButtonBack, ErrorMessage } from "@/components/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequestById } from "@/server/queries";

export default async function RequestsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getRequestById({ id: Number(id) });
  if (!response.ok || !response.data) {
    return <ErrorMessage message={response.message} />;
  }
  const request = response.data;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Editar solicitud</h1>
        <ButtonBack />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Editar solicitud</CardTitle>
          <CardDescription>
            Mientras más específico seas, mejores opciones podremos ofrecerte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormRequest request={request} />
        </CardContent>
      </Card>
    </div>
  );
}
