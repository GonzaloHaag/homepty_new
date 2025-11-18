"use client";
import { useTabs } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function SectionTabs() {
  const { handleTabChange, defaultTab } = useTabs();
  return (
    <Tabs defaultValue={defaultTab} className="w-[400px]" onValueChange={handleTabChange}>
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
      <TabsContent value="new">Change your password here.</TabsContent>
    </Tabs>
  );
}
