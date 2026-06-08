import { getInvoices, requireStore } from "@/lib/data"
import { InvoicesClient } from "@/components/dashboard/invoices-client"

export default async function InvoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  const invoicesData = await getInvoices(store.id)

  const invoices = invoicesData.map((inv) => ({
    id: inv.invoiceNumber || inv.id,
    orderId: inv.orderId,
    customer: inv.order.customer?.name || "Guest",
    amount: inv.order.totalAmount, // Assuming invoice amount is same as order amount
    date: inv.createdAt.toISOString().slice(0, 10),
    due: new Date(inv.createdAt.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // Example: due in 14 days
    status: inv.order.payment?.status === "PAID" ? "PAID" : "PENDING", // Derive status from payment
  }))

  return <InvoicesClient invoices={invoices} />
}
