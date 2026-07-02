import { db } from "@/lib/db"
import { AdminPlansClient } from "@/components/admin/admin-plans-client"

export default async function AdminPlansPage() {
  const plans = await (db as any).plan.findMany({
    include: {
      _count: { select: { subscriptions: true } }
    },
    orderBy: { sortOrder: "asc" }
  })

  return <AdminPlansClient plans={plans} />
}
