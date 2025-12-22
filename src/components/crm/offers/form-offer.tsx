"use client";
import { TYPES_OF_PROPERTIES } from "@/utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferSchema } from "@/schemas";
import { toast } from "sonner";
import { createOfferAction, updateOfferAction } from "@/server/actions";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Offer } from "@/types";
import { InputForm } from "@/components/shared";
interface Props {
  offer: Offer | null;
  closeDialog: () => void;
}
export function FormOffer({ offer, closeDialog }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(OfferSchema),
    mode: "onBlur",
    defaultValues: {
      action: offer?.action ?? "Comprar",
      tipo_propiedad: offer?.tipo_propiedad ?? "",
      min_price: offer?.min_price ?? 0,
      max_price: offer?.max_price ?? 0,
      ubicaciones: offer?.ubicaciones ?? "",
      contacto: offer?.contacto ?? "",
      nivel_urgencia: offer?.nivel_urgencia ?? "Baja (flexible)",
      notas_adicionales: offer?.notas_adicionales ?? "",
      status: offer?.status ?? "Activa",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (offer) {
      const response = await updateOfferAction({
        offerId: offer.id,
        offer: data,
      });
      if (!response.ok) {
        console.log(response.message);
        toast.error("Error al editar la oferta. Por favor, intenta de nuevo.");
        return;
      }
    } else {
      const response = await createOfferAction({ offer: data });
      if (!response.ok) {
        console.log(response.message);
        toast.error("Error al crear la oferta. Por favor, intenta de nuevo.");
        return;
      }
    }
    toast.success(
      offer ? "Oferta editada exitosamente." : "Oferta creada exitosamente."
    );
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
          <InputForm
            label="Precio mínimo *"
            id="min_price"
            type="number"
            placeholder="Ej: 1000"
            {...register("min_price", { valueAsNumber: true })}
            error={errors.min_price?.message}
          />
          <InputForm
            label="Precio máximo *"
            id="max_price"
            type="number"
            placeholder="Ej: 5000"
            {...register("max_price", { valueAsNumber: true })}
            error={errors.max_price?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            label="Ubicación(es) de interés"
            id="ubicaciones"
            type="text"
            placeholder="Aguacates, Aguas calientes"
            {...register("ubicaciones")}
            error={errors.ubicaciones?.message}
          />
          <InputForm
            label="Contacto"
            id="contacto"
            type="email"
            placeholder="Ej: test@example.com"
            {...register("contacto")}
            error={errors.contacto?.message}
          />
        </div>
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
          title={offer ? "Editar oferta" : "Crear oferta"}
          className="min-w-28"
          disabled={isSubmitting}
        >
          {offer ? "Editar oferta" : "Crear oferta"}
        </Button>
      </div>
    </form>
  );
}
