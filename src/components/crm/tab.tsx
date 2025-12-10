import Link from "next/link";
import { TabsTrigger } from "../ui/tabs";
interface Props {
  tab: {
    value: string;
    label: string;
    href: string;
  };
}
export function Tab({ tab }: Props) {
  return (
    <TabsTrigger key={tab.value} value={tab.value} asChild>
      <Link href={tab.href} title={tab.label}>
        {tab.label}
      </Link>
    </TabsTrigger>
  );
}
