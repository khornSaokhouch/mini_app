import { getProducts, requireStore } from "@/lib/data"
import { ProductsClient } from "@/components/dashboard/products-client"

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const store = await requireStore(locale)
  const products = await getProducts(store.id)

  return (
    <ProductsClient
      locale={locale}
      products={products.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku ?? "—",
        category: p.category?.name ?? "Uncategorized",
        price: p.sellPrice,
        stock: p.stockQty,
        status: p.status,
        image: p.images?.[0],
      }))}
    />
  )
}
