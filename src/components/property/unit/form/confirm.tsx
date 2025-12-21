import { CircleCheck } from "lucide-react";

export function Confirm() {
  return (
    <section className="flex items-center justify-center">
      <div className="flex flex-col gap-y-2 text-center">
        <div className="flex items-center gap-x-2 justify-center">
          <CircleCheck />
          <h2 className="font-medium text-lg">Formulario completado!</h2>
        </div>
        <p className="max-w-[400px]">
          Revisá toda la información ingresada y presioná{" "}
          <span className="text-primary">Confirmar</span> para crear la unidad.
        </p>
      </div>
    </section>
  );
}
