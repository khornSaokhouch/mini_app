import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { StorefrontClient } from "@/components/storefront/storefront-client"

export default async function StorefrontPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { slug } = await params

  // 1. Fetch Store
  const store = await db.store.findUnique({
    where: { slug }
  })

  if (!store) {
    notFound()
  }

  // 2. Fetch Categories
  const categories = await db.category.findMany({
    where: { storeId: store.id },
    orderBy: { name: "asc" }
  })

  // 3. Fetch Products
  const products = await db.product.findMany({
    where: { 
      storeId: store.id,
      status: "ACTIVE" 
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <StorefrontClient 
      store={store} 
      categories={categories} 
      products={products} 
    />
  )
}
