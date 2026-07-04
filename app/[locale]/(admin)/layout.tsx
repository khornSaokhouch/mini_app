import { Shield } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any)?.role !== "SUPER_ADMIN") {
    redirect(`/${locale}/login`)
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary/30">
      {/* Super Admin Sidebar */}
      <AdminSidebar locale={locale} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader locale={locale} adminName={session.user?.name || "Admin"} />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
