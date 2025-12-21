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
import { PlusCircleIcon } from "lucide-react";

import { useState } from "react";
export function DialogClient() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button type="button" title="nuevo cliente" size={"lg"}>
          <PlusCircleIcon /> Nuevo cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nuevo cliente</DialogTitle>
          <DialogDescription>Colocá los detalles del cliente</DialogDescription>
        </DialogHeader>
        {/* <FormClient handleDialog={handleDialog} /> */}
      </DialogContent>
    </Dialog>
  );
}
