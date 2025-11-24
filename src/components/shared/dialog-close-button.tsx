import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

export function DialogCloseButton() {
  return (
    <DialogClose asChild>
      <Button
        type="button"
        title="Cancelar"
        variant={"outline"}
        className="min-w-28"
      >
        Cancelar
      </Button>
    </DialogClose>
  );
}
