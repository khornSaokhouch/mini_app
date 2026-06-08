import { Shield, Settings, Users, Store, BarChart } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

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
    redirect(`/${locale}/login`) // Or to a 403 Forbidden page
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Super Admin Sidebar - Distinct Dark Theme */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col hidden md:flex sticky top-0 h-screen shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
          <div className="bg-indigo-600 rounded p-1.5"><Shield className="h-4 w-4 text-white" /></div>
          <span className="font-bold text-lg tracking-tight">Platform Admin</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          <Link href={`/${locale}/admin`} className="flex items-center gap-3 px-3 py-2 rounded-md bg-indigo-600/10 text-indigo-400 font-medium">
            <BarChart className="h-4 w-4" /> Overview
          </Link>
          <Link href={`/${locale}/admin/stores`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors">
            <Store className="h-4 w-4" /> Tenant Stores
          </Link>
          <Link href={`/${locale}/admin/users`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors">
            <Users className="h-4 w-4" /> Global Users
          </Link>
          <Link href={`/${locale}/admin/settings`} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors">
            <Settings className="h-4 w-4" /> System Config
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 flex items-center justify-end">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">Super Admin</span>
            <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">SA</div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
