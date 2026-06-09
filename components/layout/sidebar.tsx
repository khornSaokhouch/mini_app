"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import {
  LayoutDashboard, Package, Users, ShoppingCart,
  FileText, CreditCard, Bell, BarChart2, Settings,
  Boxes, ChevronRight, Store
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebarStore } from "@/lib/store"

const navItems = [
  { title: "Dashboard",   href: "/dashboard",            icon: LayoutDashboard },
  { title: "Orders",      href: "/dashboard/orders",     icon: ShoppingCart },
  { title: "Products",    href: "/dashboard/products",   icon: Package },
  { title: "Inventory",   href: "/dashboard/inventory",  icon: Boxes },
  { title: "Customers",   href: "/dashboard/customers",  icon: Users },
  { title: "Invoices",    href: "/dashboard/invoices",   icon: FileText },
  { title: "Payments",    href: "/dashboard/payments",   icon: CreditCard },
  { title: "Reports",     href: "/dashboard/reports",    icon: BarChart2 },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { title: "Settings",    href: "/dashboard/settings",   icon: Settings },
]

interface SidebarProps {
  locale?: string
  user?: any
}

export function Sidebar({ locale = "en", user }: SidebarProps) {
  const pathname = usePathname()
  const isCollapsed = useSidebarStore(state => state.isCollapsed)

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`
    return pathname.startsWith(fullHref) || (pathname === `/${locale}` && href === "/dashboard")
  }

  return (
    <div className={cn(
      "hidden border-r bg-background md:flex h-screen sticky top-0 flex-shrink-0 flex-col transition-[width] duration-200 ease-out will-change-[width]",
      isCollapsed ? "w-20" : "w-64 lg:w-72"
    )}>
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b px-6 gap-3", isCollapsed ? "justify-center px-0" : "")}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
          <Store className="h-4 w-4" />
        </div>
        {!isCollapsed && (
          <Link href={`/${locale}`} className="font-bold tracking-tight text-lg truncate">
            <span className="text-primary">Kh</span>Market
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 overflow-x-hidden">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                  isCollapsed ? "justify-center px-0" : "gap-3",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="flex-1 truncate">{item.title}</span>}
                {!isCollapsed && active && <ChevronRight className="h-3 w-3 opacity-60 shrink-0" />}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className={cn("border-t p-4 flex flex-col items-center", isCollapsed ? "px-2" : "")}>
        {!isCollapsed ? (
          <div className="flex items-center gap-3 w-full">
             <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
               {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
             </div>
             <div className="flex flex-col truncate">
                <span className="text-sm font-semibold truncate">{user?.name || "User"}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email || "No email"}</span>
             </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0" title={user?.name || user?.email || "User"}>
             {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </div>
        )}
      </div>
    </div>
  )
}
