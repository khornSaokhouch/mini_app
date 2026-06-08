import { requireStore, getOrders, getInventory, getPayments } from "@/lib/data"
import { CheckCircle2, AlertCircle, Info, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const icons: Record<string, { icon: any, bg: string, text: string }> = {
  order:   { icon: ShoppingCart,  bg: "bg-blue-100 dark:bg-blue-900/30",   text: "text-blue-600" },
  alert:   { icon: AlertCircle,   bg: "bg-red-100 dark:bg-red-900/30",     text: "text-red-600" },
  success: { icon: CheckCircle2,  bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600" },
  info:    { icon: Info,          bg: "bg-gray-100 dark:bg-gray-800",       text: "text-gray-600" },
}

export default async function NotificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  
  // Fetch real data to derive notifications
  const [orders, inventory, payments] = await Promise.all([
    getOrders(store.id),
    getInventory(store.id),
    getPayments(store.id)
  ])

  const notifications = []

  // 1. Order Notifications (Recent Pending Orders)
  const recentOrders = orders.filter(o => o.status === "PENDING").slice(0, 5)
  recentOrders.forEach(o => {
    notifications.push({
      id: `order-${o.id}`,
      title: "New Order Received",
      message: `Order ${o.id.slice(-8).toUpperCase()} from ${o.customer?.name || "Guest"} for $${o.totalAmount.toFixed(2)}`,
      time: o.createdAt.toLocaleDateString(),
      type: "order",
      read: false,
      date: o.createdAt
    })
  })

  // 2. Low Stock Alerts
  const lowStock = inventory.filter(p => p.stockQty <= 5)
  lowStock.forEach(p => {
    notifications.push({
      id: `stock-${p.id}`,
      title: p.stockQty === 0 ? "Out of Stock Alert" : "Low Stock Alert",
      message: `${p.name} is ${p.stockQty === 0 ? 'out of stock' : `running low (${p.stockQty} left)`}`,
      time: "Just now",
      type: "alert",
      read: false,
      date: new Date() // Always show at top
    })
  })

  // 3. Recent Payments
  const recentPayments = payments.filter(p => p.status === "PAID" || p.status === "COMPLETED").slice(0, 3)
  recentPayments.forEach(p => {
    notifications.push({
      id: `pay-${p.id}`,
      title: "Payment Received",
      message: `Payment of $${p.amount.toFixed(2)} received via ${p.method}`,
      time: p.createdAt.toLocaleDateString(),
      type: "success",
      read: true,
      date: p.createdAt
    })
  })

  // Sort by date descending
  notifications.sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on your store's activity</p>
        </div>
        <Button variant="outline" className="gap-2"><CheckCircle2 className="h-4 w-4" /> Mark all as read</Button>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No new notifications
          </div>
        ) : (
          notifications.map(notif => {
            const { icon: Icon, bg, text } = icons[notif.type]
            return (
              <Card key={notif.id} className={`border-0 shadow-sm transition-colors ${!notif.read ? "bg-primary/5 dark:bg-primary/10" : ""}`}>
                <CardContent className="p-4 flex gap-4">
                  <div className={`shrink-0 mt-0.5 h-9 w-9 rounded-full ${bg} ${text} flex items-center justify-center`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`font-semibold text-sm ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>{notif.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{notif.time}</span>
                    </div>
                    <p className={`text-sm mt-1 ${!notif.read ? "text-foreground/90" : "text-muted-foreground"}`}>{notif.message}</p>
                  </div>
                  {!notif.read && <div className="shrink-0 flex items-center"><span className="h-2 w-2 rounded-full bg-primary" /></div>}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
