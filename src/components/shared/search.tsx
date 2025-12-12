"use client";
import { type ChangeEvent } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
interface Props {
  placeholder: string;
}
export function Search({ placeholder = "Buscar..." }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    500
  );
  return (
    <div className="relative w-full">
      <SearchIcon
        size={20}
        className="text-gray-200 absolute my-auto left-3 top-0 bottom-0"
      />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-10"
        onChange={handleSearch}
        defaultValue={searchParams.get("query")?.toString() ?? ""}
      />
    </div>
  );
}
