"use client";
import { SearchIcon, Settings2Icon, PlusIcon, PanelRightCloseIcon, PanelRightOpenIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useAppShell } from "./app-shell";
import Link from "next/link";

interface ModuleHeaderProps {
    title: string;
    children?: React.ReactNode;
    searchPlaceholder?: string;
    searchParamName?: string;
}

import { useSidebar, SidebarTrigger } from "../ui/sidebar";

export function ModuleHeader({
    title,
    children,
    searchPlaceholder = "Buscar...",
    searchParamName = "search"
}: ModuleHeaderProps) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const { isRightCollapsed, setIsRightCollapsed } = useAppShell();
    const { state } = useSidebar();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(searchParamName, term);
        } else {
            params.delete(searchParamName);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <header className="sticky top-0 z-40 px-6 py-3 glass-panel flex items-center justify-between gap-6 shrink-0 border-b border-white/50">
            <div className="flex items-center gap-3 shrink-0">
                {state === "collapsed" && (
                    <SidebarTrigger className="text-slate-500 hover:text-slate-800 transition-colors" />
                )}
                <h1 className="text-lg font-bold tracking-tight text-slate-800">
                    {title}
                </h1>
            </div>

            <div className="flex-1 max-w-2xl flex items-center bg-slate-50 border border-slate-200 rounded-full px-2 py-1.5 transition-all focus-within:bg-white focus-within:shadow-md focus-within:border-blue-300/30 group">
                <div className="pl-3 pr-2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <SearchIcon size={20} />
                </div>
                <input
                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium h-8"
                    placeholder={searchPlaceholder}
                    type="text"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get(searchParamName)?.toString()}
                />
                <div className="h-5 w-px bg-slate-200 mx-2" />
                <button className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-colors whitespace-nowrap">
                    Filtros
                </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <Link
                    href="/requests/create"
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                >
                    <PlusIcon size={18} />
                    <span>Crear</span>
                </Link>
                <button
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                    onClick={() => setIsRightCollapsed(!isRightCollapsed)}
                >
                    {isRightCollapsed ? <PanelRightOpenIcon size={20} /> : <PanelRightCloseIcon size={20} />}
                </button>
            </div>
        </header>
    );
}
