import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logoutUserAction } from "@/server/actions";
import { Button } from "../ui/button";

export function ButtonLogout() {
  return (
    <form action={logoutUserAction}>
      <DropdownMenuItem asChild>
        <Button type="submit" variant="ghost" className="w-full justify-start">
          <LogOutIcon className="mr-2 size-4" />
          Cerrar sesión
        </Button>
      </DropdownMenuItem>
    </form>
  );
}
