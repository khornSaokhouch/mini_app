import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { ProductClient } from "@/components/storefront/product-client"

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string; productId: string }> 
}) {
  const { slug, productId } = await params

  // 1. Fetch Store
  const store = await db.store.findUnique({
    where: { slug }
  })

  if (!store) {
    notFound()
  }

  // 2. Fetch Product
  const product = await db.product.findFirst({
    where: { 
      id: productId,
      storeId: store.id 
    }
  })

  if (!product) {
    notFound()
  }

  return (
    <ProductClient product={product} store={store} />
  )
}
