export type FormState =
  | {
      ok?: boolean;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
