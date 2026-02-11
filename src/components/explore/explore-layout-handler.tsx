"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppShell } from "@/components/layout/app-shell";

interface Props {
    rightPanel: React.ReactNode;
}

export function ExploreLayoutHandler({ rightPanel }: Props) {
    const { setOpen } = useSidebar();
    const { setRightPanelContent } = useAppShell();

    useEffect(() => {
        // Collapse sidebar on mount
        setOpen(false);

        // Set custom right panel content
        setRightPanelContent(rightPanel);

        // Cleanup: restore defaults when leaving the page
        return () => {
            setOpen(true);
            setRightPanelContent(null);
        };
    }, [setOpen, setRightPanelContent, rightPanel]);

    return null;
}
