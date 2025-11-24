"use client";
import { useTabs } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function SectionTabs() {
  const { handleTabChange, currentTab } = useTabs({ defaultValue: "todas" });
  return (
    <Tabs 
      value={currentTab} 
      onValueChange={handleTabChange} 
      className="w-[400px]"
    >
      <TabsList>
        <TabsTrigger value="todas">Todas</TabsTrigger>
        <TabsTrigger value="nueva">Nuevas</TabsTrigger>
        <TabsTrigger value="en_proceso">En proceso</TabsTrigger>
        <TabsTrigger value="completada">Completadas</TabsTrigger>
        <TabsTrigger value="cancelada">Canceladas</TabsTrigger>
      </TabsList>
      <TabsContent value="todas">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="nueva">Nuevas solicitudes.</TabsContent>
      <TabsContent value="en_proceso">Solicitudes en proceso.</TabsContent>
      <TabsContent value="completada">Solicitudes completadas.</TabsContent>
      <TabsContent value="cancelada">Solicitudes canceladas.</TabsContent>
    </Tabs>
  );
}
