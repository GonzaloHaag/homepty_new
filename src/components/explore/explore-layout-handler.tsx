"use client";

import { useEffect } from "react";
import { useAppShell } from "@/components/layout/app-shell";

interface Props {
    rightPanel: React.ReactNode;
}

export function ExploreLayoutHandler({ rightPanel }: Props) {
    const { setRightPanelContent, setIsRightCollapsed } = useAppShell();

    useEffect(() => {
        // Ensure right panel is expanded
        setIsRightCollapsed(false);

        // Set custom right panel content
        setRightPanelContent(rightPanel);

        // Cleanup: restore defaults when leaving the page
        return () => {
            setRightPanelContent(null);
        };
    }, [setRightPanelContent, rightPanel, setIsRightCollapsed]);

    return null;
}
