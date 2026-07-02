import { Shield } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"

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
      <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex sticky top-0 h-screen shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border gap-3">
          <div className="bg-primary rounded p-1.5"><Shield className="h-4 w-4 text-primary-foreground" /></div>
          <span className="font-bold text-lg tracking-tight text-foreground">Platform Admin</span>
        </div>
        <AdminSidebarNav locale={locale} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <div className="bg-primary rounded p-1"><Shield className="h-4 w-4 text-primary-foreground" /></div>
            <span className="font-bold text-sm tracking-tight text-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <div className="flex items-center gap-3 text-sm border-l border-border pl-4">
              <span className="text-muted-foreground hidden sm:inline">Super Admin</span>
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold text-xs text-primary-foreground">SA</div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
