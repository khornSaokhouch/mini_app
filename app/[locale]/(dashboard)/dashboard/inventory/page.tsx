import { getInventory, requireStore } from "@/lib/data"
import { InventoryClient } from "@/components/dashboard/inventory-client"

export default async function InventoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const store = await requireStore(locale)
  const products = await getInventory(store.id)

  const stock = products.map((p) => {
    let status = "OK"
    if (p.stockQty === 0) status = "OUT"
    else if (p.stockQty <= 10) status = "LOW" // Hardcoded 10 as minQty for now since it's not in schema
    
    return {
      id: p.id,
      name: p.name,
      sku: p.sku,
      qty: p.stockQty,
      minQty: 10,
      status,
      image: p.images?.[0],
    }
  })

  return <InventoryClient stock={stock} />
}
