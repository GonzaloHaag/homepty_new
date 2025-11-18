"use client";
import { useActionState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { loginAction } from "@/actions/auth";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  console.log("LoginForm state:", state);
  return (
    <form action={action} className="flex flex-col gap-y-4 w-full">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Bienvenido</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresá tus credenciales para acceder al sistema
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
          {state?.errors?.email && (
            <FieldError>{state?.errors?.email}</FieldError>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Olvidaste tu contraseña?
            </Link>
          </div>
          <Input id="password" type="password" name="password" required />
          {state?.errors?.password && (
            <FieldError>{state?.errors?.password}</FieldError>
          )}
        </Field>
        { !state?.ok && state?.message && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{state.message}.</AlertTitle>
          </Alert>
        )}
        <Field>
          <Button type="submit" disabled={pending}>
            {pending ? "Ingresando..." : "Ingresar"}
          </Button>
        </Field>
        <FieldSeparator>O continuar con</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Ingresar con Google
          </Button>
          <FieldDescription className="text-center">
            Aún no tienes cuenta?
            <Link href="#" className="underline underline-offset-4 ml-2">
              Registrarse
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
