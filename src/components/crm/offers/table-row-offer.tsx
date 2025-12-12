import { TableCell, TableRow } from "@/components/ui/table";
import { Offer } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { DialogOffers } from "./dialog-offers";
import { ButtonDeleteOffer } from "./button-delete-offer";
interface Props {
  offer: Offer;
}
export function TableRowOffer({ offer }: Props) {
  return (
    <TableRow>
      <TableCell>{offer.action}</TableCell>
      <TableCell>{offer.tipo_propiedad}</TableCell>
      <TableCell className="font-medium">
        {formatMoney(offer.min_price!)} - {formatMoney(offer.max_price!)}
      </TableCell>
      <TableCell>{offer.nivel_urgencia}</TableCell>
      <TableCell>{offer.contacto}</TableCell>
      <TableCell>{offer.status}</TableCell>
      <TableCell>
        {/* Actions such as Edit/Delete can be placed here */}
        <DialogOffers offer={offer} />
        <ButtonDeleteOffer offerId={offer.id} />
      </TableCell>
    </TableRow>
  );
}
