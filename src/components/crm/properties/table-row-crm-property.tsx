import { buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PropertyWithImages } from "@/types";

import {
  CITIES_NAMES_BY_ID,
  formatMoney,
  NAME_TYPE_ACTION_BY_ID,
} from "@/utils/formatters";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
interface Props {
  property: PropertyWithImages;
}
export function TableRowCrmProperty({ property }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{property.nombre}</TableCell>
      <TableCell>{property.tipo}</TableCell>
      <TableCell>{NAME_TYPE_ACTION_BY_ID[property.id_tipo_accion]}</TableCell>
      <TableCell>
        {property.id_ciudad ? CITIES_NAMES_BY_ID[property.id_ciudad] : "N/A"}
      </TableCell>
      <TableCell>{formatMoney(property.precio)}</TableCell>
      <TableCell>
        <Link
          href={`/properties/${
            property.is_unit ? "unit" : "development"
          }/view/${property.id}`}
          className={buttonVariants({ size: "icon", variant: "outline" })}
        >
          <EyeIcon />
        </Link>
      </TableCell>
    </TableRow>
  );
}
