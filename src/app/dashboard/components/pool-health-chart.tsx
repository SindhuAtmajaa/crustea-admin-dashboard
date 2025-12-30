'use client'

import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { dashboardChartData } from "@/lib/data"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

export function PoolHealthChart() {
  const chartConfig = {
    'Main Lap Pool': {
      label: 'Main Lap Pool',
      color: 'hsl(var(--chart-1))',
    },
    'Recreation Pool': {
      label: 'Recreation Pool',
      color: 'hsl(var(--chart-2))',
    },
    'Spa Jacuzzi': {
      label: 'Spa Jacuzzi',
      color: 'hsl(var(--chart-3))',
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pools pH Levels</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={dashboardChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
             <YAxis
                domain={[6.5, 8.5]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
            <Tooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="Main Lap Pool"
              type="monotone"
              stroke="var(--color-main-lap-pool)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Recreation Pool"
              type="monotone"
              stroke="var(--color-recreation-pool)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Spa Jacuzzi"
              type="monotone"
              stroke="var(--color-spa-jacuzzi)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
