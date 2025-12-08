import { SidebarItem } from "@/types";
import {
  BriefcaseIcon,
  ClipboardListIcon,
  HomeIcon,
  MapPinIcon,
  Settings,
  UserIcon,
} from "lucide-react";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 1,
    title: "Inicio",
    url: "/",
    Icon: HomeIcon,
  },
  {
    id: 2,
    title: "Explorar",
    url: "/explore",
    Icon: MapPinIcon,
  },
  {
    id: 3,
    title: "Solicitudes",
    url: "/requests",
    Icon: ClipboardListIcon,
  },
  {
    id: 4,
    title: "CRM",
    url: "/crm",
    Icon: BriefcaseIcon,
  },
  {
    id: 5,
    title: "Perfil",
    url: "/profile",
    Icon: UserIcon,
  },
  {
    id: 6,
    title: "Settings",
    url: "/settings",
    Icon: Settings,
  },
];
