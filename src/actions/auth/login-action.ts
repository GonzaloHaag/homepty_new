"use server";
import { LoginSchema } from "@/schemas";
import { FormState } from "@/types/form-state";
import { redirect } from "next/navigation";

export async function loginAction(state: FormState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });
  if (!response.ok) {
    const data = await response.json();
    return {
      message: data.message || "Errores en el inicio de sesión",
    };
  }

  redirect("/");
}
