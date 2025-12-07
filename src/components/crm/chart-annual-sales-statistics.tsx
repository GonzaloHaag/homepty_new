"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export const description = "An area chart with axes";

const chartData = [
  { month: "Enero", ventas: 186, alquileres: 80 },
  { month: "Febrero", ventas: 305, alquileres: 200 },
  { month: "Marzo", ventas: 237, alquileres: 120 },
  { month: "Abril", ventas: 73, alquileres: 190 },
  { month: "Mayo", ventas: 209, alquileres: 130 },
  { month: "Junio", ventas: 214, alquileres: 140 },
];

const chartConfig = {
  ventas: {
    label: "ventas",
    color: "var(--chart-1)",
  },
  alquileres: {
    label: "alquileres",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAnnualSalesStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas anuales</CardTitle>
        <CardDescription>
          Mostrando el total de ventas por mes a lo largo del año
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="alquileres"
              type="natural"
              fill={chartConfig.alquileres.color}
              fillOpacity={0.4}
              stroke={chartConfig.alquileres.color}
              stackId="a"
            />
            <Area
              dataKey="ventas"
              type="natural"
              fill={chartConfig.ventas.color}
              fillOpacity={0.4}
              stroke={chartConfig.ventas.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
