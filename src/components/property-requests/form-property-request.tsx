"use client";
import { TYPE_OF_PROPERTIES } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ButtonBack } from "../shared";
import { useActionState, useEffect } from "react";
import { createPropertyApplicationAction } from "@/server/actions";
import { toast } from "sonner";

export function FormPropertyRequest() {
  const [state, formAction, pending] = useActionState(
    createPropertyApplicationAction,
    undefined
  );

  useEffect(() => {
    if (state === undefined) return;

    if (state && !state?.ok) {
      toast.error(state?.message || "Error al crear la solicitud.");
    } else {
      toast.success(state.message);
    }
    // El redirect se maneja en la action
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Sección: ¿Qué estás buscando? */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">¿Qué estás buscando?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="tipo_operacion">Tipo de operación</FieldLabel>
            <NativeSelect
              id="tipo_operacion"
              name="tipo_operacion"
              defaultValue={state?.inputs?.tipo_operacion?.toString() ?? ""}
              aria-invalid={!!state?.errors?.tipo_operacion}
            >
              <NativeSelectOption value="">
                Seleccionar tipo de operación
              </NativeSelectOption>
              <NativeSelectOption value="comprar">Comprar</NativeSelectOption>
              <NativeSelectOption value="rentar">Rentar</NativeSelectOption>
            </NativeSelect>
            {state?.errors?.tipo_operacion && (
              <FieldError>{state.errors.tipo_operacion}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="tipo_propiedad">Tipo de propiedad</FieldLabel>
            <NativeSelect
              id="tipo_propiedad"
              name="tipo_propiedad"
              defaultValue={state?.inputs?.tipo_propiedad?.toString() ?? ""}
              aria-invalid={!!state?.errors?.tipo_propiedad}
            >
              <NativeSelectOption value="">
                Seleccionar tipo de propiedad
              </NativeSelectOption>
              {TYPE_OF_PROPERTIES.map((type) => (
                <NativeSelectOption key={type.id} value={type.id}>
                  {type.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {state?.errors?.tipo_propiedad && (
              <FieldError>{state.errors.tipo_propiedad}</FieldError>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="presupuesto_min">
              Presupuesto mínimo ($)
            </FieldLabel>
            <Input
              id="presupuesto_min"
              name="presupuesto_min"
              type="number"
              placeholder="1,000,000"
              defaultValue={state?.inputs?.presupuesto_min?.toString() ?? ""}
              aria-invalid={!!state?.errors?.presupuesto_min}
            />
            {state?.errors?.presupuesto_min && (
              <FieldError>{state.errors.presupuesto_min}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="presupuesto_max">
              Presupuesto máximo ($)
            </FieldLabel>
            <Input
              id="presupuesto_max"
              name="presupuesto_max"
              type="number"
              placeholder="3,000,000"
              defaultValue={state?.inputs?.presupuesto_max?.toString() ?? ""}
              aria-invalid={!!state?.errors?.presupuesto_max}
            />
            {state?.errors?.presupuesto_max && (
              <FieldError>{state.errors.presupuesto_max}</FieldError>
            )}
          </Field>
        </div>
      </div>

      {/* Sección: ¿Dónde lo buscas? */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">¿Dónde lo buscas?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="estado">Estado</FieldLabel>
            <NativeSelect id="estado" name="estado">
              <NativeSelectOption value="">
                Selecciona un estado
              </NativeSelectOption>
              <NativeSelectOption value="10">Durango</NativeSelectOption>
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="id_ciudad">Ciudad</FieldLabel>
            <NativeSelect
              id="id_ciudad"
              name="id_ciudad"
              defaultValue={state?.inputs?.id_ciudad?.toString() ?? ""}
              aria-invalid={!!state?.errors?.id_ciudad}
            >
              <NativeSelectOption value="">
                Primero selecciona un estado
              </NativeSelectOption>
              <NativeSelectOption value="27">Gómez Palacio</NativeSelectOption>
            </NativeSelect>
            {state?.errors?.id_ciudad && (
              <FieldError>{state.errors.id_ciudad}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="zona">
            Zona o colonia específica (opcional)
          </FieldLabel>
          <Input
            id="zona"
            name="zona"
            type="text"
            placeholder="Ej. Centro, Valle Oriente, etc."
            defaultValue={state?.inputs?.zona?.toString() ?? ""}
            aria-invalid={!!state?.errors?.zona}
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Si tienes alguna zona específica en mente, indícala aquí
          </FieldDescription>
          {state?.errors?.zona && (
            <FieldError>{state.errors.zona}</FieldError>
          )}
        </Field>
      </div>

      {/* Sección: Características deseadas */}
      <div className="flex flex-col gap-y-4">
        <h2 className="text-lg font-semibold">Características deseadas</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field>
            <FieldLabel htmlFor="habitaciones">Habitaciones</FieldLabel>
            <NativeSelect
              id="habitaciones"
              name="habitaciones"
              defaultValue={state?.inputs?.habitaciones?.toString() ?? ""}
              aria-invalid={!!state?.errors?.habitaciones}
            >
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
              <NativeSelectOption value="5">5+</NativeSelectOption>
            </NativeSelect>
            {state?.errors?.habitaciones && (
              <FieldError>{state.errors.habitaciones}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="banos">Baños</FieldLabel>
            <NativeSelect
              id="banos"
              name="banos"
              defaultValue={state?.inputs?.banos?.toString() ?? ""}
              aria-invalid={!!state?.errors?.banos}
            >
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
            </NativeSelect>
            {state?.errors?.banos && (
              <FieldError>{state.errors.banos}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="estacionamientos">Estacionamientos</FieldLabel>
            <NativeSelect
              id="estacionamientos"
              name="estacionamientos"
              defaultValue={state?.inputs?.estacionamientos?.toString() ?? ""}
              aria-invalid={!!state?.errors?.estacionamientos}
            >
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
            </NativeSelect>
            {state?.errors?.estacionamientos && (
              <FieldError>{state.errors.estacionamientos}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="metros_cuadrados">Superficie (m²)</FieldLabel>
            <Input
              id="metros_cuadrados"
              name="metros_cuadrados"
              type="number"
              placeholder="80"
              defaultValue={state?.inputs?.metros_cuadrados?.toString() ?? ""}
              aria-invalid={!!state?.errors?.metros_cuadrados}
            />
            {state?.errors?.metros_cuadrados && (
              <FieldError>{state.errors.metros_cuadrados}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="detalles_adicionales">
            Detalles adicionales (opcional)
          </FieldLabel>
          <Textarea
            id="detalles_adicionales"
            name="detalles_adicionales"
            rows={4}
            placeholder="Menciona cualquier característica o requerimiento adicional que tengas..."
            className="max-h-40"
            defaultValue={state?.inputs?.detalles_adicionales?.toString() ?? ""}
            aria-invalid={!!state?.errors?.detalles_adicionales}
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Por ejemplo: necesito que tenga jardín, cerca de escuelas, etc.
          </FieldDescription>
          {state?.errors?.detalles_adicionales && (
            <FieldError>{state.errors.detalles_adicionales}</FieldError>
          )}
        </Field>
      </div>

      {/* Sección: Tus datos de contacto */}
      <div className="flex flex-col gap-y-4">
        <h2 className="text-lg font-semibold">Tus datos de contacto</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="nombre_contacto">Nombre completo</FieldLabel>
            <Input
              id="nombre_contacto"
              name="nombre_contacto"
              type="text"
              placeholder="Juan Pérez"
              defaultValue={state?.inputs?.nombre_contacto?.toString() ?? ""}
              aria-invalid={!!state?.errors?.nombre_contacto}
            />
            {state?.errors?.nombre_contacto && (
              <FieldError>{state.errors.nombre_contacto}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="correo_contacto">
              Correo electrónico
            </FieldLabel>
            <Input
              id="correo_contacto"
              name="correo_contacto"
              type="email"
              placeholder="ejemplo@correo.com"
              defaultValue={state?.inputs?.correo_contacto?.toString() ?? ""}
              aria-invalid={!!state?.errors?.correo_contacto}
            />
            {state?.errors?.correo_contacto && (
              <FieldError>{state.errors.correo_contacto}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="telefono_contacto">Teléfono</FieldLabel>
            <Input
              id="telefono_contacto"
              name="telefono_contacto"
              type="tel"
              placeholder="(81) 1234 5678"
              defaultValue={state?.inputs?.telefono_contacto?.toString() ?? ""}
              aria-invalid={!!state?.errors?.telefono_contacto}
            />
            {state?.errors?.telefono_contacto && (
              <FieldError>{state.errors.telefono_contacto}</FieldError>
            )}
          </Field>
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-x-2">
        <ButtonBack />
        <Button
          type="submit"
          title="Crear solicitud"
          className="min-w-28"
          disabled={pending}
        >
          Crear solicitud
        </Button>
      </div>
    </form>
  );
}
