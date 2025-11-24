"use client";
import { TYPE_OF_PROPERTIES } from "@/utils/constants";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button  } from "../ui/button";
import { ButtonBack } from "../shared";

export function FormPropertyApplication() {
  return (
    <form className="flex flex-col gap-6">
      {/* Sección: ¿Qué estás buscando? */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">¿Qué estás buscando?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="tipo_operacion">Tipo de operación</FieldLabel>
            <NativeSelect id="tipo_operacion" name="tipo_operacion">
              <NativeSelectOption value="">
                Seleccionar tipo de operación
              </NativeSelectOption>
              <NativeSelectOption value="comprar">Comprar</NativeSelectOption>
              <NativeSelectOption value="rentar">Rentar</NativeSelectOption>
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="tipo_propiedad">Tipo de propiedad</FieldLabel>
            <NativeSelect id="tipo_propiedad" name="tipo_propiedad">
              <NativeSelectOption value="">
                Seleccionar tipo de propiedad
              </NativeSelectOption>
              {TYPE_OF_PROPERTIES.map((type) => (
                <NativeSelectOption key={type.id} value={type.id}>
                  {type.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="presupuesto_minimo">
              Presupuesto mínimo ($)
            </FieldLabel>
            <Input
              id="presupuesto_minimo"
              name="presupuesto_minimo"
              type="number"
              placeholder="1,000,000"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="presupuesto_maximo">
              Presupuesto máximo ($)
            </FieldLabel>
            <Input
              id="presupuesto_maximo"
              name="presupuesto_maximo"
              type="number"
              placeholder="3,000,000"
            />
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
              {/* Agregar opciones de estados */}
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="ciudad">Ciudad</FieldLabel>
            <NativeSelect id="ciudad" name="ciudad">
              <NativeSelectOption value="">
                Primero selecciona un estado
              </NativeSelectOption>
              {/* Las ciudades se cargarán según el estado */}
            </NativeSelect>
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
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Si tienes alguna zona específica en mente, indícala aquí
          </FieldDescription>
        </Field>
      </div>

      {/* Sección: Características deseadas */}
      <div className="flex flex-col gap-y-4">
        <h2 className="text-lg font-semibold">Características deseadas</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field>
            <FieldLabel htmlFor="habitaciones">Habitaciones</FieldLabel>
            <NativeSelect id="habitaciones" name="habitaciones">
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
              <NativeSelectOption value="5">5+</NativeSelectOption>
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="banos">Baños</FieldLabel>
            <NativeSelect id="banos" name="banos">
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="estacionamientos">Estacionamientos</FieldLabel>
            <NativeSelect id="estacionamientos" name="estacionamientos">
              <NativeSelectOption value="">Seleccionar</NativeSelectOption>
              <NativeSelectOption value="1">1+</NativeSelectOption>
              <NativeSelectOption value="2">2+</NativeSelectOption>
              <NativeSelectOption value="3">3+</NativeSelectOption>
              <NativeSelectOption value="4">4+</NativeSelectOption>
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="superficie">Superficie (m²)</FieldLabel>
            <Input
              id="superficie"
              name="superficie"
              type="number"
              placeholder="80"
            />
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
          />
          <FieldDescription className="text-xs text-muted-foreground mt-1">
            Por ejemplo: necesito que tenga jardín, cerca de escuelas, etc.
          </FieldDescription>
        </Field>
      </div>

      {/* Sección: Tus datos de contacto */}
      <div className="flex flex-col gap-y-4">
        <h2 className="text-lg font-semibold">Tus datos de contacto</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="nombre_completo">Nombre completo</FieldLabel>
            <Input
              id="nombre_completo"
              name="nombre_completo"
              type="text"
              placeholder="Juan Pérez"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="correo_electronico">
              Correo electrónico
            </FieldLabel>
            <Input
              id="correo_electronico"
              name="correo_electronico"
              type="email"
              placeholder="ejemplo@correo.com"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="(81) 1234 5678"
            />
          </Field>
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-x-2">
        <ButtonBack />
        <Button type="submit" title="Crear solicitud" className="min-w-28">
          Crear solicitud
        </Button>
      </div>
    </form>
  );
}
