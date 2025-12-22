"use client";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { ROUTE_TITLES } from "@/utils/constants";

export function Header() {
  const pathname = usePathname();
  const section = pathname.split("/")[1];
  const titlePage = ROUTE_TITLES[section] ?? "Inicio";
  return (
    <header className="flex items-center shrink-0 p-2 h-12 border-b w-full gap-2">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <h1 className="font-bold uppercase">{titlePage}</h1>
    </header>
  );
}
