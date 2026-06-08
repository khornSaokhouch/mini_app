import { db } from "@/lib/db"
import { AdminStoresClient } from "@/components/admin/admin-stores-client"

export default async function AdminStoresPage() {
  const stores = await db.store.findMany({
    include: {
      owner: true,
      _count: {
        select: { products: true, orders: true }
      }
    },
    orderBy: { createdAt: "desc" }
  })
  
  return <AdminStoresClient stores={stores} />
}
