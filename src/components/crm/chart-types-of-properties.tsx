"use client";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label";

const chartData = [
  { type: "Casa", quantity: 275, fill: "var(--color-chrome)" },
  { type: "Departamento", quantity: 200, fill: "var(--color-safari)" },
  { type: "Lote", quantity: 187, fill: "var(--color-firefox)" },
  { type: "Local comercial", quantity: 173, fill: "var(--color-edge)" },
  { type: "Otro", quantity: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  quantity: {
    label: "quantity",
  },
  chrome: {
    label: "Casa",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Deparatamento",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Lote",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Local comercial",
    color: "var(--chart-4)",
  },
  other: {
    label: "Oto",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartTypesOfProperties() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tipos de inmuebles</CardTitle>
        <CardDescription>Mostrando cantidad de cada tipo de propiedad</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-full max-h-[400px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="quantity" label nameKey="type" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
