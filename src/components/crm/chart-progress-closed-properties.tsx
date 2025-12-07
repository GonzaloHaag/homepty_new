import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

export function ChartProgressClosedProperties() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progreso de inmuebles</CardTitle>
        <CardDescription>Porcentaje de inmuebles cerrados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Cierres</span>
            <span className="font-semibold text-muted-foreground">
              20%
            </span>
          </div>
          <Progress value={20} />
        </div>
      </CardContent>
    </Card>
  );
};
