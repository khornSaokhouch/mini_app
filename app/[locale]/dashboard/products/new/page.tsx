import { requireStore } from "@/lib/data"
import { ProductForm } from "@/components/dashboard/product-form"

export default async function NewProductPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  await requireStore(locale)

  return <ProductForm locale={locale} />
}
