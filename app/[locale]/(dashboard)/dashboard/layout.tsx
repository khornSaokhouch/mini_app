import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getCurrentStore } from "@/lib/data"
import { db } from "@/lib/db"
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/${locale}/login`)
  }

  const store = await getCurrentStore()
  let pendingOrders = 0
  if (store) {
    pendingOrders = await db.order.count({
      where: { storeId: store.id, status: "PENDING" }
    })
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar locale={locale} user={session.user} pendingOrders={pendingOrders} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header locale={locale} user={session.user} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
