import "server-only";
import { cache } from "react";
import { createClient } from "./supabase/server";

export const verifySession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autenticado");
  }

  return {
    isAuth: true,
    userId: user.id,
  };
});
