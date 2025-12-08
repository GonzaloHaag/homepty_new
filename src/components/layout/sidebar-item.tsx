"use client";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { type SidebarItem } from "@/types";
import { usePathname } from "next/navigation";
interface Props {
  item: SidebarItem;
}
export function SidebarItem({ item }: Props) {
  const pathname = usePathname();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={item.url}
          title={item.title}
          className={`font-medium ${
            item.url === pathname ? "text-primary bg-muted" : ""
          }`}
        >
          <item.Icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
