"use client";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

export function HeaderSidebar() {
  const { state } = useSidebar();
  return (
    <SidebarHeader className="border-b">
      <SidebarMenu>
        <SidebarMenuItem className="p-2 text-primary font-semibold text-lg">
          {state === "collapsed" ? "H" : "Homepty"}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
