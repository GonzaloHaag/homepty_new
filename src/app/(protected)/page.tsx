import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TYPES_OF_PROPERTIES } from "@/utils/constants";

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        Encontrá las mejores propiedades
      </h1>
      <form className="w-full flex items-center gap-4 bg-muted/50 p-4 rounded">
        <Input
          type="search"
          placeholder="Nombre, estado o ciudad..."
          className="md:max-w-sm"
        />
        <NativeSelect>
          <NativeSelectOption value="">
            Seleccionar tipo de operacion
          </NativeSelectOption>
          {/* {TYPE_OF_OPERATIONS.map((operation) => (
            <NativeSelectOption key={operation.id} value={operation.value}>
              {operation.label}
            </NativeSelectOption>
          ))} */}
        </NativeSelect>
        <NativeSelect>
          <NativeSelectOption value="">
            Seleccionar tipo de propiedad
          </NativeSelectOption>
          {TYPES_OF_PROPERTIES.map((type) => (
            <NativeSelectOption key={type.id} value={type.value}>
              {type.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </form>

      <section className="">
        <Tabs defaultValue="popular" className="w-full">
          <TabsList>
            <TabsTrigger value="popular" className="min-w-32">
              Popular
            </TabsTrigger>
            <TabsTrigger value="recommended" className="min-w-32">
              Recomendados
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            LIsta de propiedades populares aquí.
          </TabsContent>
          <TabsContent value="recommended">
            Lista de propiedades recomendadas aquí.
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
