"use client";
import { Button } from "@/components/ui/button";
import { deleteOfferAction } from "@/server/actions";
import { Offer } from "@/types";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
interface Props {
  offerId: Offer["id"];
}
export function ButtonDeleteOffer({ offerId }: Props) {
  const [isPending, startTransition] = useTransition();
  const onClickDelete = () => {
    startTransition(async () => {
      const response = await deleteOfferAction({ offerId });
        if (!response.ok) {
            toast.error("Error al eliminar la oferta. Por favor, intenta de nuevo.");
            return;
        }
        toast.success("Oferta eliminada exitosamente.");
    });
  };
  return (
    <Button
      type="button"
      title="Eliminar"
      variant={"destructive"}
      size={"icon"}
      className="ml-2"
      onClick={onClickDelete}
      disabled={isPending}
    >
      <Trash2Icon />
    </Button>
  );
}
