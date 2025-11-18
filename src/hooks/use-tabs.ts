import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function useTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("tab", value);
    } else {
      params.delete("tab");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const defaultTab = searchParams.get("tab") || "todas";

  return {
    handleTabChange,
    defaultTab,
  };
}
