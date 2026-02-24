"use client";

import { useEffect } from "react";
import { PropertyWithImages } from "@/types";
import { PropertyContent } from "./property-content";
import { PropertySidebar } from "./property-sidebar";
import { useAppShell } from "@/hooks";

interface Props {
    property: PropertyWithImages;
}

export function PropertyViewLayout({ property }: Props) {
    const { setRightPanelContent, setIsRightCollapsed } = useAppShell();

    // Inject Sidebar content on mount
    useEffect(() => {
        setRightPanelContent(<PropertySidebar property={property} />);
        setIsRightCollapsed(false); // Ensure sidebar is open by default

        // Cleanup: clear sidebar when unmounting (leaving the page)
        // Optional: revert to default right panel if needed
        return () => {
            setRightPanelContent(null);
        };
    }, [property, setRightPanelContent, setIsRightCollapsed]);

    return <PropertyContent property={property} />;
}
