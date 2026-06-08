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
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">Platform Overview</h1>
        <p className="text-slate-400 mt-1">Global statistics across all tenants.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Stores</CardTitle>
            <StoreIcon className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStores}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Global Users</CardTitle>
            <Users className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Platform Revenue</CardTitle>
            <Activity className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">N/A</div>
            <p className="text-xs text-emerald-400 mt-1">MRR</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800 text-slate-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">System Status</CardTitle>
            <Server className="w-4 h-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">99.9%</div>
            <p className="text-xs text-slate-400 mt-1">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800 text-slate-50">
        <CardHeader>
          <CardTitle>Recent Tenant Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Store Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentStores.map(store => (
                  <tr key={store.id} className="border-b border-slate-800 hover:bg-slate-800/25">
                    <td className="px-4 py-3 font-medium text-slate-200">{store.name}</td>
                    <td className="px-4 py-3">{store.slug}</td>
                    <td className="px-4 py-3">{store.owner.email}</td>
                    <td className="px-4 py-3">{new Date(store.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {recentStores.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500">No stores found</td>
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
