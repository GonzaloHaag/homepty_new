"use client";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { type SidebarItem } from "@/types";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  ClipboardListIcon,
  GlobeIcon,
  HomeIcon,
  MapPinIcon,
  UserIcon,
} from "lucide-react";
interface Props {
  item: SidebarItem;
}

const ICONS = {
  home: HomeIcon,
  explore: MapPinIcon,
  requests: ClipboardListIcon,
  crm: BriefcaseIcon,
  globe: GlobeIcon,
  profile: UserIcon,
};
export function SidebarItem({ item }: Props) {
  const pathname = usePathname();
  const Icon = ICONS[item.icon as keyof typeof ICONS];
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
          <Icon size={16} />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
