import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Server, Users, Store as StoreIcon } from "lucide-react"
import { db } from "@/lib/db"

export default async function AdminDashboardPage() {
  const [totalStores, totalUsers, recentStores] = await Promise.all([
    db.store.count(),
    db.user.count(),
    db.store.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { owner: true }
    })
  ])

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">Global statistics across all tenants.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stores</CardTitle>
            <StoreIcon className="w-4 h-4 text-muted-foreground/75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStores}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Global Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground/75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Platform Revenue</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground/75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">N/A</div>
            <p className="text-xs text-emerald-500 mt-1 font-medium">MRR</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
            <Server className="w-4 h-4 text-muted-foreground/75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border text-card-foreground">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent Tenant Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase bg-muted/50 text-foreground font-semibold">
                <tr>
                  <th className="px-4 py-3">Store Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentStores.map(store => (
                  <tr key={store.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{store.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{store.slug}</td>
                    <td className="px-4 py-3">{store.owner?.email || "No Owner"}</td>
                    <td className="px-4 py-3">{new Date(store.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {recentStores.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No stores found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
