export type QueryResponse<T> = {
  ok: boolean;
  message: string;
  data?: T;
};
