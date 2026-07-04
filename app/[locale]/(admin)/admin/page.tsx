import { RevenueChart } from "@/components/admin/revenue-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Server, Users, Store as StoreIcon } from "lucide-react"
import { db } from "@/lib/db"

export default async function AdminDashboardPage() {
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const [totalStores, totalUsers, totalProducts, totalOrders, totalRevenue, recentStores, monthlyRevenue] = await Promise.all([
    db.store.count(),
    db.user.count(),
    db.product.count(),
    db.order.count(),
    db.order.aggregate({ _sum: { totalAmount: true } }),
    db.store.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { owner: true }
    }),
    db.order.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: sixMonthsAgo } },
      _sum: { totalAmount: true },
      orderBy: { createdAt: "asc" },
    }),
  ])

  const monthMap: Record<string, number> = {}
  for (const row of monthlyRevenue) {
    const label = new Date(row.createdAt).toLocaleString("en", { month: "short", year: "2-digit" })
    monthMap[label] = (monthMap[label] ?? 0) + (row._sum.totalAmount ?? 0)
  }
  const chartData = Object.entries(monthMap).map(([month, total]) => ({ month, total }))

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and insights</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stores</CardTitle>
            <StoreIcon className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{totalStores}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">${(totalRevenue._sum.totalAmount || 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <Server className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      <RevenueChart data={chartData} />

      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle>Recent Tenant Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-4">Store Name</th>
                  <th className="px-4 py-4">Slug</th>
                  <th className="px-4 py-4">Owner Email</th>
                  <th className="px-4 py-4 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentStores.map(store => (
                  <tr key={store.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-foreground">{store.name}</td>
                    <td className="px-4 py-4 font-mono text-xs text-primary">{store.slug}</td>
                    <td className="px-4 py-4 text-muted-foreground">{store.owner?.email || "N/A"}</td>
                    <td className="px-4 py-4 text-right text-muted-foreground">{new Date(store.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
