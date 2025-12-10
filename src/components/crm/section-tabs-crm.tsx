"use client";
import { TABS_CRM } from "@/utils/constants";
import { Tabs, TabsList } from "../ui/tabs";
import { Tab } from "./tab";
import { usePathname } from "next/navigation";

export function SectionTabsCrm() {
  const pathname = usePathname();
  const currentTab = TABS_CRM.find((tab) => tab.href === pathname);
  return (
    <Tabs className="w-full" defaultValue={currentTab?.value || "crm"}>
      <TabsList className="w-full">
        {TABS_CRM.map((tab) => (
          <Tab key={tab.value} tab={tab} />
        ))}
      </TabsList>
    </Tabs>
  );
}
