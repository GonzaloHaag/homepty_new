import { type LucideIcon } from "lucide-react";
import { Database } from "./database";

export * from "./database";

export type ActionResponse = {
  ok: boolean;
  message: string;
};

export type FormState<T> =
  | {
      ok?: boolean;
      errors?: Partial<Record<keyof T, string[]>>;
      inputs?: Partial<T>;
      message?: string;
    }
  | undefined;

export type QueryResponse<T> = {
  ok: boolean;
  message: string;
  data?: T;
};

export type DevelopmentType = "Preventa" | "Edificio" | "Plaza Comercial" | "Lote";
export type UnitType = "Departamento" | "Local comercial" | "Oficina" | "Lote" | "Casa";

export type SidebarItem = {
  id: number;
  title: string;
  url: string;
  Icon: LucideIcon;
};
export type Request = Database["public"]["Tables"]["solicitudes"]["Row"];
export type RequestStatus = Request["estado_solicitud"];
export type User = Database["public"]["Tables"]["usuarios"]["Row"];
type UnitImages = Database["public"]["Tables"]["imagenes_unidades"]["Row"];
export type Unit = Database["public"]["Tables"]["unidades"]["Row"];
export type UnitWithImages = Unit & {
  imagenes_unidades: UnitImages[];
};

export type Development = Database["public"]["Tables"]["desarrollos"]["Row"];
export type DevelopmentImage = Database["public"]["Tables"]["imagenes_desarrollos"]["Row"];
export type DevelopmentWithImages = Development & {
  imagenes_desarrollos: DevelopmentImage[];
};

export type Property = UnitWithImages | DevelopmentWithImages;

export type PropertyWithLocation = Property & {
  coordinates?: [number, number]; // [longitude, latitude]
};

export type Offer = Database["public"]["Tables"]["ofertas"]["Row"];