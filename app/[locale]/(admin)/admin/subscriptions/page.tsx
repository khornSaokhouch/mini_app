import { db } from "@/lib/db"
import { AdminSubscriptionsClient } from "@/components/admin/admin-subscriptions-client"

export default async function AdminSubscriptionsPage() {
  const subscriptions = await (db as any).subscription.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      plan: { select: { id: true, name: true, priceMonthly: true, priceYearly: true } },
    },
    orderBy: { createdAt: "desc" }
  })

  // Serialize dates to strings for the client
  const serialized = subscriptions.map((s: any) => ({
    ...s,
    currentPeriodStart: s.currentPeriodStart.toISOString(),
    currentPeriodEnd: s.currentPeriodEnd.toISOString(),
    cancelledAt: s.cancelledAt?.toISOString() ?? null,
    trialEndsAt: s.trialEndsAt?.toISOString() ?? null,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }))

  return <AdminSubscriptionsClient subscriptions={serialized} />
}
