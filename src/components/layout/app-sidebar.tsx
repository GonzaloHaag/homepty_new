import {
  BriefcaseIcon,
  ClipboardListIcon,
  HomeIcon,
  MapPinIcon,
  Settings,
  UserIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HeaderSidebar } from "./header-sidebar";
import Link from "next/link";
import { NavUser } from "./nav-user";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Explorar",
    url: "/explorar",
    icon: MapPinIcon,
  },
  {
    title: "Solicitudes",
    url: "/solicitudes-inmuebles",
    icon: ClipboardListIcon,
  },
  {
    title: "CRM",
    url: "#",
    icon: BriefcaseIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Perfil",
    url: "/perfil",
    icon: UserIcon,
  }
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <HeaderSidebar />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      title={item.title}
                      className="font-medium"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
