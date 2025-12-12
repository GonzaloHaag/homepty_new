import { DialogOffers, TableOffers } from "@/components/crm/offers";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOffersByCurrentUser } from "@/server/queries";
import { Suspense } from "react";

export default function CrmOffersPage() {
    const offersPromise = getOffersByCurrentUser();
  return (
      <Card>
        <CardHeader>
          <CardTitle>Todas las ofertas</CardTitle>
          <CardDescription>
           Ofertas que has realizado
          </CardDescription>
          <CardAction>
              <DialogOffers offer={null} />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          {/* <SectionFilters /> */}
          {/* <Suspense
            key={status + tipo_propiedad_id}
            fallback={<div>Cargando solicitudes...</div>}
          >
            <TableRequests requestsPromise={requestsPromise} />
          </Suspense> */}
          <Suspense fallback={<div>Cargando ofertas...</div>}>
             <TableOffers offersPromise={offersPromise} />
          </Suspense>
        </CardContent>
      </Card>
  );
}
