"use client";
import { useTabs } from "@/hooks";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function SectionTabs() {
  const { handleTabChange, currentTab } = useTabs({ defaultValue: "todas" });
  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList>
        <TabsTrigger value="todas">Todas</TabsTrigger>
        <TabsTrigger value="nueva">Nuevas</TabsTrigger>
        <TabsTrigger value="en_proceso">En proceso</TabsTrigger>
        <TabsTrigger value="completada">Completadas</TabsTrigger>
        <TabsTrigger value="cancelada">Canceladas</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
