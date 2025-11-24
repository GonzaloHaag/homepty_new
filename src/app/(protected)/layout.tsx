import { AppSidebar, Header } from "@/components/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4">
          <section className="min-h-[calc(100svh - 3rem)] flex-1 md:min-h-min">
            {children}
          </section>
        </main>
        <Toaster duration={3000} position="top-right" richColors={true} />
      </SidebarInset>
    </SidebarProvider>
  );
}
