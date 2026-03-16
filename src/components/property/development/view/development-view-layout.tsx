"use client";
import { PropertyWithImages, PropertyWithImagesAndAmenities } from "@/types";
import { useEffect, useState } from "react";
import { DevelopmentContent } from "./development-content";
import { DevelopmentSidebar } from "./development-sidebar";
import { useAppShell } from "@/hooks";
import type { PropertyOwner } from "../../view/property-owner-card";

interface Props {
    property: PropertyWithImagesAndAmenities;
    owner: PropertyOwner | null;
    units: PropertyWithImages[];
}

export type DevelopmentTab = "overview" | "units";

export function DevelopmentViewLayout({ property, owner, units }: Props) {
    const { setRightPanelContent, setIsRightCollapsed } = useAppShell();
    const [activeTab, setActiveTab] = useState<DevelopmentTab>("overview");

    // Inject Sidebar content on mount and when activeTab changes
    useEffect(() => {
        setRightPanelContent(
            <DevelopmentSidebar 
                property={property} 
                owner={owner} 
                activeTab={activeTab} 
            />
        );
        setIsRightCollapsed(false);

        return () => {
            setRightPanelContent(null);
        };
    }, [property, owner, activeTab, setRightPanelContent, setIsRightCollapsed]);

    return (
        <DevelopmentContent
            property={property}
            owner={owner}
            units={units}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
    );
}
