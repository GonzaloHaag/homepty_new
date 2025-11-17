import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return Response.json({ message: "Error logging out" }, { status: 500 });
  }
  return Response.json({
    message: "Logged out successfully",
  });
}
