"use server";
import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

export async function logoutUserAction(): Promise<void> {
  console.log("Logging out user...");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
