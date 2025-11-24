"use client";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
    const pathname = usePathname();
    const splitPathname = pathname.split("/");
    const titlePage = pathname === "/" ? "Inicio" : splitPathname[1];
    return (
        <header className="flex items-center shrink-0 p-2 h-12 border-b w-full gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <h1 className="font-bold capitalize">{titlePage}</h1>
        </header>
    );
}