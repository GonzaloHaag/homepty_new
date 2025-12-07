import { Request } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { CITIES_NAMES_BY_ID, STATES_NAMES_BY_ID } from "@/utils/formatters";
interface Props {
  request: Request;
}
export function DialogViewRequest({ request }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          size={"icon"}
          title="Detalles"
        >
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalles de la solicitud</DialogTitle>
          <DialogDescription>
             {STATES_NAMES_BY_ID[request.id_estado]} - {CITIES_NAMES_BY_ID[request.id_ciudad!]}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
