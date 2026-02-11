"use client";

import { useState } from "react";
import { RightPanel } from "./right-panel";
import { cn } from "@/lib/utils";

export function AppShell({
    children,
    leftSidebar
}: {
    children: React.ReactNode;
    leftSidebar: React.ReactNode;
}) {
    const [isRightCollapsed, setIsRightCollapsed] = useState(false);
    // Note: We'll use the sidebar state from the provider to manage the left column width

    return (
        <div
            className="grid h-screen w-full overflow-hidden bg-[var(--background-light)] transition-all duration-300 ease-app-shell"
            style={{
                gridTemplateColumns: `auto 1fr ${isRightCollapsed ? "0px" : "280px"}`,
            }}
        >
            {/* Left Sidebar Column */}
            <div className="h-full transition-all duration-300 ease-app-shell overflow-hidden z-20">
                {leftSidebar}
            </div>

            {/* Main Column */}
            <div className="flex flex-col min-w-0 h-full transition-all duration-300 ease-app-shell overflow-hidden py-6">
                {/* Surface Container (Header is inside children -> ModuleHeader) */}
                <main className="@container surface-container flex-1 flex flex-col overflow-hidden relative mx-6 rounded-[24px] shadow-float border border-white/40 z-10 transition-all duration-300 ease-app-shell">
                    <div className="flex-1 flex flex-col overflow-hidden w-full max-w-[1600px] mx-auto">
                        <AppShellContext.Provider value={{ isRightCollapsed, setIsRightCollapsed }}>
                            {children}
                        </AppShellContext.Provider>
                    </div>
                </main>
            </div>

            {/* Right Panel Column */}
            <div
                className={cn(
                    "hidden xl:block h-full transition-all duration-300 overflow-hidden ease-app-shell",
                    isRightCollapsed ? "w-0 opacity-0" : "w-[280px] opacity-100"
                )}
            >
                <RightPanel />
            </div>
        </div>
    );
}

import { createContext, useContext } from "react";

interface AppShellContextType {
    isRightCollapsed: boolean;
    setIsRightCollapsed: (v: boolean) => void;
}

const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

export function useAppShell() {
    const context = useContext(AppShellContext);
    if (!context) {
        throw new Error("useAppShell must be used within an AppShell");
    }
    return context;
}
