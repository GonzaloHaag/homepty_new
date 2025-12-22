"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon, PlusCircleIcon } from "lucide-react";

import { useState } from "react";
import { FormClient } from "./form-client";
import { Client } from "@/types";
interface Props {
  client: Client | null;
}
export function DialogClient({ client }: Props) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button type="button" variant={client ? "outline" : "default"} title={client ? "Editar cliente" : "Nuevo cliente"} size={client ? "icon" : "default"}>
          {
             client ? (
               <PencilIcon className="text-green-600" />
             ) : (
                <>
                 <PlusCircleIcon /> Nuevo cliente
                </>
             )
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[95svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{client ? "Editar cliente" : "Nuevo cliente"}</DialogTitle>
          <DialogDescription>{client ? "Modificá los detalles del cliente" : "Colocá los detalles del cliente"}</DialogDescription>
        </DialogHeader>
        <FormClient client={client} handleDialog={handleDialog} />
      </DialogContent>
    </Dialog>
  );
}
