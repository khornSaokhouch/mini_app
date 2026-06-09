import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { CartClient } from "@/components/storefront/cart-client"

export default async function CartPage({ 
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
    <CartClient store={store} />
  )
}
