export type FormState<T> =
  | {
      ok?: boolean;
      errors?: Partial<Record<keyof T, string[]>>;
      inputs?: Partial<T>;
      message?: string;
    }
  | undefined;
