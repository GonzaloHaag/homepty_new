import { Suspense } from "react";
import { UserInfo, UserInfoSkeleton } from "@/components/profile";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/server/queries";
import { TYPES_OF_PROPERTIES } from "@/utils/constants";
import { CameraIcon, PlusIcon, Share2Icon } from "lucide-react";
import Link from "next/link";
export default async function ProfilePage() {
  const userPromise = getUserInfo();
  return (
    <div className="flex flex-col gap-y-4">
      <section className="flex bg-[url('/images/placeholder.svg')] bg-center bg-cover min-h-40 rounded-md relative p-4">
        <Button type="button" variant={"outline"} title="Cambiar banner">
          <CameraIcon />
          Cambiar banner
        </Button>
      </section>
      {/** Info user */}
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo userPromise={userPromise} />
      </Suspense>
      <Separator />
      <Tabs defaultValue="my-properties" className="w-full">
        <section className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="my-properties">Mis propiedades</TabsTrigger>
            <TabsTrigger value="my-activities">Mis actividades</TabsTrigger>
            <TabsTrigger value="my-statistics">Mis estadísticas</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-x-2">
            <Button variant="outline" title="Compartir">
              <Share2Icon /> Compartir
            </Button>
            <Link
              href="/properties/create/"
              title="Crear propiedad"
              className={buttonVariants({ variant: "default" })}
            >
              <PlusIcon /> Crear propiedad
            </Link>
          </div>
        </section>
        <Separator className="my-4" />
        <TabsContent value="my-properties">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-0">
              <h4 className="text-lg font-medium">Mis propiedades</h4>
              <span className="text-sm text-muted-foreground">
                3 propiedades
              </span>
            </div>
            <NativeSelect>
              <NativeSelectOption value="">Todos los tipos</NativeSelectOption>
              {TYPES_OF_PROPERTIES.map((type) => (
                <NativeSelectOption key={type.id} value={type.value}>
                  {type.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </TabsContent>
        <TabsContent value="my-activities">Página en desarrollo.</TabsContent>
        <TabsContent value="my-statistics">Página en desarrollo.</TabsContent>
      </Tabs>
    </div>
  );
}
