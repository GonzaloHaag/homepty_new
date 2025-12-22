import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface Props {
  showMoreFilters: boolean;
}
export function SectionMoreFilters({ showMoreFilters }: Props) {
  return (
    <section
      className={`grid transition-all duration-200 ease-in-out overflow-hidden ${
        showMoreFilters
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0">
        <div className="w-full flex flex-col md:flex-row flex-wrap items-center gap-4 p-2">
            <Field className="flex-1 w-40">
              <FieldLabel htmlFor="precioMin">Precio min.</FieldLabel>
              <Input
                type="number"
                id="precioMin"
                name="precioMin"
                placeholder="Ej: 50000"
              />
            </Field>
            <Field className="flex-1 w-40">
              <FieldLabel htmlFor="precioMax">Precio máx.</FieldLabel>
              <Input
                type="number"
                id="precioMax"
                name="precioMax"
                placeholder="Ej: 100000"
              />
            </Field>
          <Field className="flex-1 w-32">
            <FieldLabel htmlFor="habitaciones">Habitaciones</FieldLabel>
            <Input
              type="number"
              id="habitaciones"
              name="habitaciones"
              placeholder="Ej: 2"
            />
          </Field>
          <Field className="flex-1 w-32">
            <FieldLabel htmlFor="banios">Baños</FieldLabel>
            <Input
              type="number"
              id="banios"
              name="banios"
              placeholder="Ej: 2"
            />
          </Field>
          <Field className="flex-1 w-32">
            <FieldLabel htmlFor="estacionamientos">Estacionamientos</FieldLabel>
            <Input
              type="number"
              id="estacionamientos"
              name="estacionamientos"
              placeholder="Ej: 2"
            />
          </Field>
        </div>
      </div>
    </section>
  );
}
