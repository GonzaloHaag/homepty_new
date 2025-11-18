import { FormPropertyApplication } from "@/components/solicitudes-inmuebles";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function SolicitudesInmueblesCrearPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Crear solicitud</h1>
        <Link
          href={"/solicitudes-inmuebles"}
          title="Regresar"
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeftIcon />
          Regresar
        </Link>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Detalla lo que búscas</CardTitle>
          <CardDescription>
            Mientras más específico seas, mejores opciones podremos ofrecerte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormPropertyApplication />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
