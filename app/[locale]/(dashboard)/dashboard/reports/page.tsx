import { getDashboardStats, requireStore } from "@/lib/data"
import { ReportsClient } from "@/components/dashboard/reports-client"

export default async function ReportsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  const stats = await getDashboardStats(store.id)

  return <ReportsClient stats={stats} />
}
