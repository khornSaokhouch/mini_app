import { getDashboardStats, requireStore } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Clock, Package } from "lucide-react"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { OnboardingGuide } from "@/components/dashboard/onboarding-guide"

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const store = await requireStore(locale)
  const stats = await getDashboardStats(store.id)

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      sub: `${stats.totalOrders} orders total`,
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      sub: `${stats.lowStockProducts} low on stock`,
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      sub: "Registered customers",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      sub: `${stats.totalOrders} orders total`,
    },
  ]

  const hasProducts = stats.totalProducts > 0
  const hasTelegramBot = Boolean(store.telegramBot)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">{store.name}</p>
        </div>
      </div>

      {/* Onboarding Guide — shown until all core steps are done */}
      <OnboardingGuide
        hasProducts={hasProducts}
        hasTelegramBot={hasTelegramBot}
        storeSlug={store.slug}
        locale={locale}
      />

      {/* Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts + Recent Orders */}
      <DashboardCharts
        recentOrders={stats.recentOrders.map((o) => ({
          id: o.id,
          customer: o.customer?.name ?? "Guest",
          total: o.totalAmount,
          status: o.status,
          date: o.createdAt.toISOString(),
        }))}
        monthlyRevenue={stats.monthlyRevenue.map((m) => ({
          date: new Date(m.createdAt).toLocaleString("en", { month: "short", year: "2-digit" }),
          total: m._sum.totalAmount ?? 0,
        }))}
      />
    </div>
  )
}
