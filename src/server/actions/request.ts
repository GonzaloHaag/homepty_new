"use server";
import { verifySession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { RequestSchema } from "@/schemas";
import { Request } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export async function createRequestAction({ request }: { request: unknown }) {
  const validatedFields = RequestSchema.safeParse(request);

  if (!validatedFields.success) {
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase.from("solicitudes").insert({
    ...validatedFields.data,
    usuario_id: userId,
  });

  if (error) {
    console.error("Error al crear la solicitud:", error);
    return {
      ok: false,
      message: "Error al crear la solicitud. Por favor, intenta de nuevo.",
    };
  }
  revalidatePath("/requests");
  redirect("/requests");
}

export async function editRequestAction({
  id,
  request,
}: {
  id: Request["id"];
  request: unknown;
}) {
  const validatedFields = RequestSchema.safeParse(request);

  if (!validatedFields.success) {
    return {
      ok: false,
      message: "Error de validación. Por favor, revisa los campos.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { userId } = await verifySession();
  const supabase = await createClient();
  const { error } = await supabase
    .from("solicitudes")
    .update({
      ...validatedFields.data,
    })
    .eq("id", id)
    .eq("usuario_id", userId);

  if (error) {
    console.error("Error al editar la solicitud:", error);
    return {
      ok: false,
      message: "Error al editar la solicitud. Por favor, intenta de nuevo.",
    };
  }
  revalidatePath("/requests");
  redirect("/requests");
}
