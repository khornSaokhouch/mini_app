"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Package, Users, ShoppingCart,
  FileText, CreditCard, Bell, BarChart2, Settings,
  Boxes, ChevronRight, Store
} from "lucide-react"
import { cn } from "@/lib/utils"

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
}

export function Sidebar({ locale = "en" }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`
    return pathname.startsWith(fullHref) || (pathname === `/${locale}` && href === "/dashboard")
  }

  return (
    <div className="hidden border-r bg-background md:flex md:w-64 lg:w-72 h-screen sticky top-0 flex-shrink-0 flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6 gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
          <Store className="h-4 w-4" />
        </div>
        <Link href={`/${locale}`} className="font-bold tracking-tight text-lg">
          <span className="text-primary">Kh</span>Market
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.title}</span>
                {active && <ChevronRight className="h-3 w-3 opacity-60" />}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground text-center">KhMarket v1.0</p>
      </div>
    </div>
  )
}
