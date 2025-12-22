import { DialogClient, TableCrmClients } from "@/components/crm/clients";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getClientsByCurrentUser } from "@/server/queries";

import { Suspense } from "react";

export default function CrmClientsPage() {
  const clientsPromise = getClientsByCurrentUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de clientes</CardTitle>
        <CardDescription>
          Aquí puedes ver y gestionar todos tus clientes
        </CardDescription>
        <CardAction>
          <DialogClient client={null} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<span className="text-gray-500">Cargando clientes...</span>}>
          <TableCrmClients clientsPromise={clientsPromise} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
