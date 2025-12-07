import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
const locationData = [
  {
    city: "Madrid",
    properties: 45,
    percentage: 35.2,
    color: "bg-chart-1",
    trend: "+5.2%",
  },
  {
    city: "Barcelona",
    properties: 32,
    percentage: 25.0,
    color: "bg-chart-2",
    trend: "+2.1%",
  },
  {
    city: "Valencia",
    properties: 28,
    percentage: 21.9,
    color: "bg-chart-3",
    trend: "+8.3%",
  },
  {
    city: "Sevilla",
    properties: 15,
    percentage: 11.7,
    color: "bg-chart-4",
    trend: "-1.2%",
  },
  {
    city: "Bilbao",
    properties: 8,
    percentage: 6.2,
    color: "bg-chart-5",
    trend: "+3.4%",
  },
];
export function ChartLocationOfProperties() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Localización de inmuebles</CardTitle>
        <CardDescription>Porcentaje de propiedades por ciudad</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          {locationData.map((location) => (
            <div key={location.city} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{location.city}</span>
                    <span className="font-semibold text-muted-foreground">{location.percentage}%</span>
                </div>
                <Progress 
                value={location.percentage}
                />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
