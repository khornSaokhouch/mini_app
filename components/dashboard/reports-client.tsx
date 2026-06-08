"use client"

import { Download, TrendingUp, Users, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const defaultRevenueData = [
  { name: 'Mon', total: 1200 },
  { name: 'Tue', total: 2100 },
  { name: 'Wed', total: 800 },
  { name: 'Thu', total: 1600 },
  { name: 'Fri', total: 2900 },
  { name: 'Sat', total: 3700 },
  { name: 'Sun', total: 2100 },
]

export function ReportsClient({ stats }: { stats: any }) {
  // Use stats.monthlyRevenue to populate chart if available, otherwise fallback
  const chartData = stats?.monthlyRevenue?.length > 0 
    ? stats.monthlyRevenue.map((m: any) => ({ name: new Date(m.createdAt).toLocaleDateString(), total: m._sum.totalAmount || 0 }))
    : defaultRevenueData

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your store's performance metrics</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <Card className="md:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Revenue breakdown over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Highlight Stats */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 border-0 shadow-sm bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between">
                Total Revenue
                <TrendingUp className="h-5 w-5 opacity-70" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mt-2">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
              <p className="text-sm opacity-80 mt-1">Lifetime</p>
            </CardContent>
          </Card>
          
          <Card className="flex-1 border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between text-muted-foreground">
                Total Customers
                <Users className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats?.totalCustomers || 0}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="currentColor" strokeWidth={3} className="stroke-blue-500" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Orders by Source</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[250px]">
             <div className="flex flex-col items-center gap-4 w-full px-8">
               <div className="w-full">
                 <div className="flex justify-between text-sm mb-1"><span>Telegram Mini App</span> <span className="font-bold">65%</span></div>
                 <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[65%]" /></div>
               </div>
               <div className="w-full">
                 <div className="flex justify-between text-sm mb-1"><span>Web Storefront</span> <span className="font-bold">25%</span></div>
                 <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[25%]" /></div>
               </div>
               <div className="w-full">
                 <div className="flex justify-between text-sm mb-1"><span>Manual / Admin</span> <span className="font-bold">10%</span></div>
                 <div className="h-2 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-slate-500 w-[10%]" /></div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
