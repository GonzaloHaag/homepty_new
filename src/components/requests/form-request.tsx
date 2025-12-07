"use client";
import { CITIES, STATES, TYPES_OF_PROPERTIES } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ButtonBack } from "../shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequestSchema } from "@/schemas";
import { createRequestAction, editRequestAction } from "@/server/actions";
import { toast } from "sonner";
import { Request } from "@/types";
interface Props {
  request: Request | null;
}
export function FormRequest({ request }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RequestSchema),
    mode: "onBlur",
    defaultValues: {
      tipo_operacion: request?.tipo_operacion ?? "Comprar",
      tipo_propiedad_id: request?.tipo_propiedad_id ?? 1,
      presupuesto_min: request?.presupuesto_min ?? undefined,
      presupuesto_max: request?.presupuesto_max ?? undefined,
      id_estado: request?.id_estado ?? undefined,
      id_ciudad: request?.id_ciudad ?? undefined,
      zona: request?.zona ?? "",
      habitaciones: request?.habitaciones ?? undefined,
      banos: request?.banos ?? undefined,
      estacionamientos: request?.estacionamientos ?? undefined,
      metros_cuadrados: request?.metros_cuadrados ?? undefined,
      detalles_adicionales: request?.detalles_adicionales ?? "",
      nombre_contacto: request?.nombre_contacto ?? "",
      correo_contacto: request?.correo_contacto ?? "",
      telefono_contacto: request?.telefono_contacto ?? "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (request) {
      const response = await editRequestAction({
        id: request.id,
        request: data,
      });
      if (!response.ok) {
        toast.error(
          "Error al editar la solicitud. Por favor, intenta de nuevo."
        );
        return;
      }
    } else {
      const response = await createRequestAction({ request: data });
      if (!response.ok) {
        toast.error(
          "Error al crear la solicitud. Por favor, intenta de nuevo."
        );
        return;
      }
    }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Sección: ¿Qué estás buscando? */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">¿Qué estás buscando?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="tipo_operacion">Tipo de operación</FieldLabel>
            <NativeSelect
              id="tipo_operacion"
              {...register("tipo_operacion")}
              aria-invalid={!!errors.tipo_operacion}
            >
              <NativeSelectOption value="">
                Seleccionar tipo de operación
              </NativeSelectOption>
              <NativeSelectOption value="Comprar">Comprar</NativeSelectOption>
              <NativeSelectOption value="Rentar">Rentar</NativeSelectOption>
            </NativeSelect>
            {errors.tipo_operacion && (
              <FieldError>{errors.tipo_operacion.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="tipo_propiedad_id">
              Tipo de propiedad
            </FieldLabel>
            <NativeSelect
              id="tipo_propiedad_id"
              {...register("tipo_propiedad_id", { valueAsNumber: true })}
              aria-invalid={!!errors.tipo_propiedad_id}
            >
              <NativeSelectOption value="">
                Seleccionar tipo de propiedad
              </NativeSelectOption>
              {TYPES_OF_PROPERTIES.map((type) => (
                <NativeSelectOption key={type.id} value={type.id}>
                  {type.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {errors.tipo_propiedad_id && (
              <FieldError>{errors.tipo_propiedad_id.message}</FieldError>
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
              type="number"
              placeholder="1,000,000"
              {...register("presupuesto_min", { valueAsNumber: true })}
              aria-invalid={!!errors.presupuesto_min}
            />
            {errors.presupuesto_min && (
              <FieldError>{errors.presupuesto_min.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="presupuesto_max">
              Presupuesto máximo ($)
            </FieldLabel>
            <Input
              id="presupuesto_max"
              type="number"
              placeholder="3,000,000"
              {...register("presupuesto_max", { valueAsNumber: true })}
              aria-invalid={!!errors.presupuesto_max}
            />
            {errors.presupuesto_max && (
              <FieldError>{errors.presupuesto_max.message}</FieldError>
            )}
          </Field>
        </div>
      </div>

      {/* Sección: ¿Dónde lo buscas? */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">¿Dónde lo buscas?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="id_estado">Estado</FieldLabel>
            <NativeSelect
              id="id_estado"
              {...register("id_estado", { valueAsNumber: true })}
              aria-invalid={!!errors.id_estado}
            >
              <NativeSelectOption value="">
                Selecciona un estado
              </NativeSelectOption>
              {STATES.map((state) => (
                <NativeSelectOption key={state.id} value={state.id}>
                  {state.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {errors.id_estado && (
              <FieldError>{errors.id_estado.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="id_ciudad">Ciudad</FieldLabel>
            <NativeSelect
              id="id_ciudad"
              {...register("id_ciudad", { valueAsNumber: true })}
              aria-invalid={!!errors.id_ciudad}
            >
              <NativeSelectOption value="">
                Primero selecciona un estado
              </NativeSelectOption>
              {CITIES.map((city) => (
                <NativeSelectOption key={city.id} value={city.id}>
                  {city.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {errors.id_ciudad && (
              <FieldError>{errors.id_ciudad.message}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="zona">
            Zona o colonia específica (opcional)
          </FieldLabel>
          <Input
            id="zona"
            type="text"
            placeholder="Ej. Centro, Valle Oriente, etc."
            {...register("zona")}
            aria-invalid={!!errors.zona}
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Si tienes alguna zona específica en mente, indícala aquí
          </FieldDescription>
          {errors.zona && <FieldError>{errors.zona.message}</FieldError>}
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
              {...register("habitaciones", { valueAsNumber: true })}
              aria-invalid={!!errors.habitaciones}
            >
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
              <NativeSelectOption value="5">5+</NativeSelectOption>
            </NativeSelect>
            {errors.habitaciones && (
              <FieldError>{errors.habitaciones.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="banos">Baños</FieldLabel>
            <NativeSelect
              id="banos"
              {...register("banos", { valueAsNumber: true })}
              aria-invalid={!!errors.banos}
            >
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
            </NativeSelect>
            {errors.banos && <FieldError>{errors.banos.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="estacionamientos">Estacionamientos</FieldLabel>
            <NativeSelect
              id="estacionamientos"
              {...register("estacionamientos", { valueAsNumber: true })}
              aria-invalid={!!errors.estacionamientos}
            >
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
            </NativeSelect>
            {errors.estacionamientos && (
              <FieldError>{errors.estacionamientos.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="metros_cuadrados">Superficie (m²)</FieldLabel>
            <Input
              id="metros_cuadrados"
              type="number"
              placeholder="80"
              {...register("metros_cuadrados", { valueAsNumber: true })}
              aria-invalid={!!errors.metros_cuadrados}
            />
            {errors.metros_cuadrados && (
              <FieldError>{errors.metros_cuadrados.message}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="detalles_adicionales">
            Detalles adicionales (opcional)
          </FieldLabel>
          <Textarea
            id="detalles_adicionales"
            rows={4}
            placeholder="Menciona cualquier característica o requerimiento adicional que tengas..."
            className="max-h-40"
            {...register("detalles_adicionales")}
            aria-invalid={!!errors.detalles_adicionales}
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Por ejemplo: necesito que tenga jardín, cerca de escuelas, etc.
          </FieldDescription>
          {errors.detalles_adicionales && (
            <FieldError>{errors.detalles_adicionales.message}</FieldError>
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
              type="text"
              placeholder="Juan Pérez"
              {...register("nombre_contacto")}
              aria-invalid={!!errors.nombre_contacto}
            />
            {errors.nombre_contacto && (
              <FieldError>{errors.nombre_contacto.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="correo_contacto">
              Correo electrónico
            </FieldLabel>
            <Input
              id="correo_contacto"
              type="email"
              placeholder="ejemplo@correo.com"
              {...register("correo_contacto")}
              aria-invalid={!!errors.correo_contacto}
            />
            {errors.correo_contacto && (
              <FieldError>{errors.correo_contacto.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="telefono_contacto">Teléfono</FieldLabel>
            <Input
              id="telefono_contacto"
              type="tel"
              placeholder="(81) 1234 5678"
              {...register("telefono_contacto")}
              aria-invalid={!!errors.telefono_contacto}
            />
            {errors.telefono_contacto && (
              <FieldError>{errors.telefono_contacto.message}</FieldError>
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
          disabled={isSubmitting}
        >
          {request ? "Editar solicitud" : "Crear solicitud"}
        </Button>
      </div>
    </form>
  );
}
