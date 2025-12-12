import { ErrorMessage } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Offer, QueryResponse } from "@/types";
import { TableRowOffer } from "./table-row-offer";
interface Props {
  offersPromise: Promise<QueryResponse<Offer[]>>;
}
export async function TableOffers({ offersPromise }: Props) {
  const response = await offersPromise;
  if (!response.ok || !response.data) {
    return <ErrorMessage message="Error al cargar las ofertas" />;
  }
  const offers = response.data;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Acción</TableHead>
          <TableHead>Tipo propiedad</TableHead>
          <TableHead>Rango de Precio</TableHead>
          <TableHead>Urgencia</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No hay ofertas disponibles.
            </TableCell>
          </TableRow>
        ) : (
          offers.map((offer) => <TableRowOffer key={offer.id} offer={offer} />)
        )}
      </TableBody>
    </Table>
  );
}
