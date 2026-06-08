import { db } from "@/lib/db"
import { AdminUsersClient } from "@/components/admin/admin-users-client"

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" }
  })
  
  return <AdminUsersClient users={users} />
}
