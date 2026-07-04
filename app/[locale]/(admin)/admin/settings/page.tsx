import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AdminSettingsClient } from "@/components/admin/admin-settings-client"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id
  if (!userId) redirect("/login")

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true }
  })
  
  if (!user) redirect("/login")

  return <AdminSettingsClient initialUser={user} />
}
