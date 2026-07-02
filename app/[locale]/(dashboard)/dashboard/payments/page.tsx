import { getPayments, requireStore } from "@/lib/data"
import { PaymentsClient } from "@/components/dashboard/payments-client"

export default async function PaymentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  const paymentsData = await getPayments(store.id)

  const payments = paymentsData.map((payment) => ({
    id: payment.transactionId || payment.id,
    orderId: payment.orderId,
    amount: payment.amount,
    method: payment.method || "Unknown",
    date: payment.createdAt.toISOString().slice(0, 16).replace("T", " "),
    status: payment.status,
  }))

  return <PaymentsClient payments={payments} />
}
