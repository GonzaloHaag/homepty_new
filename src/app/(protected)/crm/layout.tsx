import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const TABS = [
  { value: "crm", label: "CRM", href: "/crm" },
  { value: "propiedades", label: "Propiedades", href: "/crm/propiedades" },
  { value: "clientes", label: "Clientes", href: "/crm/clientes" },
  { value: "calendario", label: "Calendario", href: "/crm/calendario" },
];

export default function CrmLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex flex-col gap-y-6 w-full">
      <Tabs className="w-full" defaultValue="crm">
        <TabsList className="w-full">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} asChild>
              <Link href={tab.href} title={tab.label}>
                {tab.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {children}
    </section>
  );
}
