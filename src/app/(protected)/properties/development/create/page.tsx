import { FormPropertyDevelopment } from "@/components/property/development";

export default function PropertiesDevelopmentCreatePage() {
  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0 p-8">
        <FormPropertyDevelopment />
      </div>
    </div>
  );
}
