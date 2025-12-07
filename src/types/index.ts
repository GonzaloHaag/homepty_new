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

export type Request = Database["public"]["Tables"]["solicitudes"]["Row"];
export type User = Database["public"]["Tables"]["usuarios"]["Row"];
export type Unit = Database["public"]["Tables"]["unidades"]["Row"];
