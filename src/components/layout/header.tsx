import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
    return (
        <header className="flex items-center shrink-0 p-2 h-12 border-b w-full gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <h1 className="font-bold">Inicio</h1>
        </header>
    );
}