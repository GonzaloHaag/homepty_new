"use client";
import { useTabs } from "@/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TablePropertyRequests } from "./table-property-requests";

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
      <Card>
        <CardHeader>
          <CardTitle>Todas las solicitudes</CardTitle>
          <CardDescription>
            Solicitudes de todas las categorías.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value="todas">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="nueva">
            <TablePropertyRequests />
          </TabsContent>
          <TabsContent value="en_proceso">Solicitudes en proceso.</TabsContent>
          <TabsContent value="completada">Solicitudes completadas.</TabsContent>
          <TabsContent value="cancelada">Solicitudes canceladas.</TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
