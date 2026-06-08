import { notFound } from "next/navigation"
import { getProduct, requireStore } from "@/lib/data"
import { ProductForm } from "@/components/dashboard/product-form"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const store = await requireStore(locale)
  const product = await getProduct(id, store.id)

  if (!product) notFound()

  return (
    <ProductForm
      locale={locale}
      product={{
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        barcode: product.barcode,
        costPrice: product.costPrice,
        sellPrice: product.sellPrice,
        stockQty: product.stockQty,
        status: product.status,
        images: product.images,
        category: product.category ? { id: product.category.id, name: product.category.name } : null,
        brand: product.brand ? { id: product.brand.id, name: product.brand.name } : null,
        variants: product.variants.map(v => ({
          name: v.name,
          value: v.value,
          additionalPrice: v.additionalPrice,
        })),
      }}
    />
  )
}
