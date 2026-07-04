"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface RevenueChartProps {
  data: { month: string; total: number }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Revenue Trends (6 Months)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full min-h-[300px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Tooltip 
              cursor={{fill: 'hsl(var(--muted)/0.4)'}}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderRadius: '12px', 
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: any) => [`$${typeof value === 'number' ? value.toLocaleString() : value}`, "Revenue"]}
            />
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
