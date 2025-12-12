"use client";
import { TYPES_OF_PROPERTIES } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferSchema } from "@/schemas";
import { toast } from "sonner";
import { createOfferAction } from "@/server/actions";
interface Props {
  closeDialog: () => void;
}
export function FormOffer({ closeDialog }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(OfferSchema),
    mode: "onBlur",
    defaultValues: {
      action: "Comprar",
      tipo_propiedad: undefined,
      min_price: undefined,
      max_price: undefined,
      ubicaciones: "",
      contacto: "",
      nivel_urgencia: "Baja (flexible)",
      notas_adicionales: "",
      status: "Activa",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await createOfferAction({ offer: data });
    if (!response.ok) {
        console.log(response.message);
      toast.error("Error al crear la solicitud. Por favor, intenta de nuevo.");
      return;
    }
    toast.success("Oferta creada exitosamente");
    closeDialog();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Sección: ¿Qué quieres hacer? */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="action">Que quieres hacer? *</FieldLabel>
            <NativeSelect
              id="action"
              {...register("action")}
              aria-invalid={!!errors.action}
            >
              <NativeSelectOption value="">Seleccionar...</NativeSelectOption>
              <NativeSelectOption value="Comprar">Comprar</NativeSelectOption>
              <NativeSelectOption value="Rentar">Rentar</NativeSelectOption>
            </NativeSelect>
            {errors.action && <FieldError>{errors.action.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="tipo_propiedad">
              Tipo de propiedad *
            </FieldLabel>
            <NativeSelect
              id="tipo_propiedad"
              {...register("tipo_propiedad")}
              aria-invalid={!!errors.tipo_propiedad}
            >
              <NativeSelectOption value="">
                Seleccionar tipo...
              </NativeSelectOption>
              {TYPES_OF_PROPERTIES.map((type) => (
                <NativeSelectOption key={type.id} value={type.label}>
                  {type.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {errors.tipo_propiedad && (
              <FieldError>{errors.tipo_propiedad.message}</FieldError>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="min_price">Precio mínimo *</FieldLabel>
            <Input
              id="min_price"
              type="number"
              placeholder="Ej: 1000"
              {...register("min_price", { valueAsNumber: true })}
              aria-invalid={!!errors.min_price}
            />
            {errors.min_price && (
              <FieldError>{errors.min_price.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="max_price">Precio máximo *</FieldLabel>
            <Input
              id="max_price"
              type="number"
              placeholder="Ej: 5000"
              {...register("max_price", { valueAsNumber: true })}
              aria-invalid={!!errors.max_price}
            />
            {errors.max_price && (
              <FieldError>{errors.max_price.message}</FieldError>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="ubicaciones">
            Ubicacion(es) de interés
          </FieldLabel>
          <Input
            id="ubicaciones"
            type="text"
            placeholder="Aguacates, Aguas calientes"
            {...register("ubicaciones")}
            aria-invalid={!!errors.ubicaciones}
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Separa múltiples ubicaciones con comas
          </FieldDescription>
          {errors.ubicaciones && (
            <FieldError>{errors.ubicaciones.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="contacto">
            Método de contacto preferido
          </FieldLabel>
          <Input
            id="contacto"
            type="email"
            placeholder="Ej: test@example.com"
            {...register("contacto")}
            aria-invalid={!!errors.contacto}
          />
          {errors.contacto && (
            <FieldError>{errors.contacto.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="nivel_urgencia">Nivel de urgencia</FieldLabel>
          <NativeSelect
            id="nivel_urgencia"
            {...register("nivel_urgencia")}
            aria-invalid={!!errors.nivel_urgencia}
          >
            <NativeSelectOption value="">Seleccionar...</NativeSelectOption>
            <NativeSelectOption value="Baja (flexible)">
              Baja (flexible)
            </NativeSelectOption>
            <NativeSelectOption value="Media (en algunas semanas)">
              Media (en algunas semanas)
            </NativeSelectOption>
            <NativeSelectOption value="Alta (urgente)">
              Alta (urgente)
            </NativeSelectOption>
          </NativeSelect>
          {errors.nivel_urgencia && (
            <FieldError>{errors.nivel_urgencia.message}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="notas_adicionales">Notas adicionales</FieldLabel>
          <Textarea
            id="notas_adicionales"
            rows={4}
            placeholder="Colocá algún detalle importante a tener en cuenta"
            className="max-h-40"
            {...register("notas_adicionales")}
            aria-invalid={!!errors.notas_adicionales}
          />
          {errors.notas_adicionales && (
            <FieldError>{errors.notas_adicionales.message}</FieldError>
          )}
        </Field>
      </div>

      <div className="w-full flex items-center justify-end gap-x-2">
        <Button
          type="submit"
          title="Enviar oferta"
          className="min-w-28"
          disabled={isSubmitting}
        >
          Enviar oferta
        </Button>
      </div>
    </form>
  );
}
