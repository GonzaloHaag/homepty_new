"use client";
import { createContext } from "react";
interface AppShellContextType {
    isRightCollapsed: boolean;
    setIsRightCollapsed: (v: boolean) => void;
    toggleSidebarRight: () => void;
    setRightPanelContent: (v: React.ReactNode | null) => void;
}
export const AppShellContext = createContext<AppShellContextType | null>(null);