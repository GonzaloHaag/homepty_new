"use client";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DollarSignIcon } from "lucide-react";
import { FormValueEstimator } from "./form-value-estimator";

export function DialogValueEstimator() {
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
          size={"lg"}
          variant={"outline"}
        >
          <DollarSignIcon className="text-primary" /> Estimar valor
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-3xl max-h-[95dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <DollarSignIcon className="text-primary" /> Estimador de valor
          </DialogTitle>
          <DialogDescription>
            Calculá el valor aproximado de un inmueble basado en sus
            características.
          </DialogDescription>
        </DialogHeader>
        {/* <FormOffer closeDialog={closeDialog} /> */}
        <FormValueEstimator />
      </DialogContent>
    </Dialog>
  );
}
