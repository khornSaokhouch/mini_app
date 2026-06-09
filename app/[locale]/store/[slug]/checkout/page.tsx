import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { CheckoutClient } from "@/components/storefront/checkout-client"

export default async function CheckoutPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { slug } = await params

  const store = await db.store.findUnique({
    where: { slug }
  })

  if (!store) {
    notFound()
  }

  return (
    <CheckoutClient store={store} />
  )
}
