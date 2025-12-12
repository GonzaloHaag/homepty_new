"use client";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HandshakeIcon, PencilIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormOffer } from "./form-offer";
import { Offer } from "@/types";
interface Props {
  offer: Offer | null;
}
export function DialogOffers({ offer }: Props) {
  const [open, setOpen] = useState(false);
  const closeDialog = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          title="estimar valor"
          size={offer ? "icon" : "default"}
          variant={offer ? "outline" : "default"}
        >
          {offer ? <PencilIcon className="text-green-600" /> : <PlusIcon />}
          {offer ? null : "Nueva oferta"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-3xl max-h-[95dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <HandshakeIcon className="text-green-600" /> Ofertas inmobiliarias
          </DialogTitle>
          <DialogDescription>
            {offer ? "Editar oferta" : "Crear una nueva oferta inmobiliaria"}
          </DialogDescription>
        </DialogHeader>
        <FormOffer offer={offer} closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
