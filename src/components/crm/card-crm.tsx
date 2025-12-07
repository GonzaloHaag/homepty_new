import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  Icon: LucideIcon;
  quantity: number;
  description: string;
  backgroundColor:string;
}

export function CardCrm({ title, Icon, quantity, description, backgroundColor }: CardProps) {
  return (
    <Card className={`${backgroundColor} text-slate-100`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          {title}
        </CardTitle>
        <Icon className="text-slate-200" size={24} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{quantity}</div>
        <p className="text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
