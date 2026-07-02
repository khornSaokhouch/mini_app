import { getCustomers, requireStore } from "@/lib/data"
import { CustomersClient } from "@/components/dashboard/customers-client"

export default async function CustomersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  const customers = await getCustomers(store.id)

  return (
    <CustomersClient
      customers={customers.map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email ?? "—",
        phone: c.phone ?? "—",
        orders: c.orders.length,
        spent: c.orders.reduce((acc, o) => acc + o.totalAmount, 0),
        status: "ACTIVE", // Or compute based on last order
      }))}
    />
  )
}
