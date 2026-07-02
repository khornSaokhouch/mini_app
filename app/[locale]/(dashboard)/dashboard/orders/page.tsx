import { getOrders, requireStore } from "@/lib/data"
import { OrdersClient } from "@/components/dashboard/orders-client"

export default async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  const orders = await getOrders(store.id)

  return (
    <OrdersClient
      orders={orders.map((o) => ({
        id: o.id,
        customer: o.customer?.name ?? "Guest",
        customerPhone: o.customer?.phone,
        customerNotes: o.customer?.notes,
        items: o.items.length,
        itemsList: o.items.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: o.totalAmount,
        date: o.createdAt.toISOString().slice(0, 10),
        status: o.status,
      }))}
    />
  )
}
