"use client";
import { createContext } from "react";

interface AppShellContextType {
    isRightCollapsed: boolean;
    setIsRightCollapsed: (v: boolean) => void;
    setRightPanelContent: (v: React.ReactNode | null) => void;
    toggleSidebarRight: () => void;
}

export const AppShellContext = createContext<AppShellContextType | null>(null);
