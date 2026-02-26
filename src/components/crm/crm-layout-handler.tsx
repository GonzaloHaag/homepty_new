"use client";

import { useEffect } from "react";
import { useAppShell } from "@/components/layout/app-shell";
import { CopilotAI } from "@/components/layout/copilot-ai";

export function CrmLayoutHandler() {
    const { setRightPanelContent, setIsRightCollapsed } = useAppShell();

    useEffect(() => {
        setIsRightCollapsed(false);
        setRightPanelContent(<CopilotAI />);

        return () => {
            setRightPanelContent(null);
        };
    }, [setRightPanelContent, setIsRightCollapsed]);

    return null;
}
