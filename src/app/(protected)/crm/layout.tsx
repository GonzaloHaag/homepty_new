import { SectionTabsCrm } from "@/components/crm";
export default function CrmLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex flex-col gap-y-6 w-full">
      <SectionTabsCrm />
      {children}
    </section>
  );
}
