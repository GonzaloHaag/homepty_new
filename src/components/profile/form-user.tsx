"use client";
import { USER_ACTIVITY } from "@/utils/constants";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Textarea } from "../ui/textarea";
import { DialogFooter } from "../ui/dialog";
import { DialogCloseButton } from "../shared";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { editUserAction } from "@/server/actions";
import { User } from "@/types";
import { toast } from "sonner";
interface Props {
  user: User;
  closeDialog: () => void;
}
export function FormUser({ user, closeDialog }: Props) {
  const [state, formAction, pending] = useActionState(
    editUserAction.bind(null, user.id),
    undefined
  );
  useEffect(() => {
    console.log(state);
    if (state === undefined) return;
    if (state && !state?.ok) {
      toast.error(state?.message || "Error al actualizar el perfil.");
    } else {
      toast.success(state.message);
      closeDialog();
    }
  }, [state, closeDialog]);
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="nombre_usuario">Nombre de usuario</FieldLabel>
          <Input
            type="text"
            id="nombre_usuario"
            name="nombre_usuario"
            defaultValue={state?.inputs?.nombre_usuario ?? user.nombre_usuario ?? ""}
            aria-invalid={!!state?.errors?.nombre_usuario}
          />
          {state?.errors?.nombre_usuario && (
            <FieldError>{state.errors.nombre_usuario}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="telefono_usuario">Teléfono</FieldLabel>
          <Input
            type="tel"
            id="telefono_usuario"
            name="telefono_usuario"
            defaultValue={
              state?.inputs?.telefono_usuario ?? user.telefono_usuario ?? ""
            }
            aria-invalid={!!state?.errors?.telefono_usuario}
          />
          {state?.errors?.telefono_usuario && (
            <FieldError>{state.errors.telefono_usuario}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email_usuario">Correo electrónico</FieldLabel>
          <Input
            type="email"
            id="email_usuario"
            name="email_usuario"
            defaultValue={state?.inputs?.email_usuario ?? user.email_usuario}
            aria-invalid={!!state?.errors?.email_usuario}
            readOnly
          />
          {state?.errors?.email_usuario && (
            <FieldError>{state.errors.email_usuario}</FieldError>
          )}
        </Field>
        <FieldSeparator />
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="actividad_usuario">
              Actividad profesional
            </FieldLabel>
            <NativeSelect
              id="actividad_usuario"
              name="actividad_usuario"
              defaultValue={
                state?.inputs?.actividad_usuario ?? user.actividad_usuario ?? ""
              }
              aria-invalid={!!state?.errors?.actividad_usuario}
            >
              {USER_ACTIVITY.map((activity) => (
                <NativeSelectOption key={activity.id} value={activity.value}>
                  {activity.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {state?.errors?.actividad_usuario && (
              <FieldError>{state.errors.actividad_usuario}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="id_estado">Estado</FieldLabel>
            <NativeSelect
              id="id_estado"
              name="id_estado"
              defaultValue={state?.inputs?.id_estado ?? user.id_estado ?? ""}
              aria-invalid={!!state?.errors?.id_estado}
            >
              <NativeSelectOption value={10}>Durango</NativeSelectOption>
            </NativeSelect>
            {state?.errors?.id_estado && (
              <FieldError>{state.errors.id_estado}</FieldError>
            )}
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="id_ciudad">Ciudad</FieldLabel>
          <NativeSelect
            id="id_ciudad"
            name="id_ciudad"
            defaultValue={state?.inputs?.id_ciudad ?? user.id_ciudad ?? ""}
            aria-invalid={!!state?.errors?.id_ciudad}
          >
            <NativeSelectOption value={27}>Gomez palacio</NativeSelectOption>
          </NativeSelect>
          {state?.errors?.id_ciudad && (
            <FieldError>{state.errors.id_ciudad}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="descripcion_usuario">Descripción</FieldLabel>
          <Textarea
            id="descripcion_usuario"
            name="descripcion_usuario"
            rows={4}
            placeholder="Cuentanos sobre ti..."
            defaultValue={
              state?.inputs?.descripcion_usuario ?? user.descripcion_usuario ?? ""
            }
            aria-invalid={!!state?.errors?.descripcion_usuario}
          />
          {state?.errors?.descripcion_usuario && (
            <FieldError>{state.errors.descripcion_usuario}</FieldError>
          )}
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogCloseButton />
        <Button
          type="submit"
          title="Guardar"
          className="min-w-28"
          disabled={pending}
        >
          Guardar
        </Button>
      </DialogFooter>
    </form>
  );
}
