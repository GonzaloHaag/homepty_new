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
    <Card className="flex flex-col h-full rounded-2xl border-none shadow-sm transition-all duration-300">
      <CardHeader className="flex flex-row justify-between items-start pb-2">
        <div>
          <CardTitle className="text-lg font-bold text-gray-800">Tipos de inmuebles</CardTitle>
          <CardDescription>Distribución de cartera</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center relative pt-4">
        <div className="relative w-full aspect-square max-w-[260px] mx-auto">
          <ChartContainer
            config={chartConfig}
            className="w-full h-full pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="quantity"
                nameKey="type"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                stroke="none"
              />
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">24</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Inmuebles</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 gap-2 w-full">
          {chartData.map((item) => (
            <div key={item.type} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-gray-50 border border-gray-100/50">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.fill }}
              ></span>
              <span className="text-[10px] text-gray-600 font-medium truncate">{item.type}</span>
              <span className="text-[10px] text-gray-400 ml-auto font-mono">{item.quantity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
