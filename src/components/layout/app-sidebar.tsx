import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { HeaderSidebar } from "./header-sidebar";
import { NavUser } from "./nav-user";
import { SIDEBAR_ITEMS } from "@/utils/sidebar";
import { SidebarItem } from "./sidebar-item";

export function AppSidebar() {
  const sidebarItemsMap = SIDEBAR_ITEMS.map((item) => (
    <SidebarItem key={item.id} item={item} />
  ));
  return (
    <Sidebar collapsible="icon">
      <HeaderSidebar />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItemsMap}
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
