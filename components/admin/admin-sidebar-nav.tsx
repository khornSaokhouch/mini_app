"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Store, Users, Settings, Package, CreditCard } from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: any
}

export function AdminSidebarNav({ locale }: { locale: string }) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      href: `/${locale}/admin`,
      label: "Overview",
      icon: BarChart,
    },
    {
      href: `/${locale}/admin/stores`,
      label: "Tenant Stores",
      icon: Store,
    },
    {
      href: `/${locale}/admin/users`,
      label: "Global Users",
      icon: Users,
    },
    {
      href: `/${locale}/admin/plans`,
      label: "Manage Plans",
      icon: Package,
    },
    {
      href: `/${locale}/admin/subscriptions`,
      label: "Subscriptions",
      icon: CreditCard,
    },
    {
      href: `/${locale}/admin/settings`,
      label: "System Config",
      icon: Settings,
    },
  ]

  return (
    <nav className="flex-1 py-4 px-3 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href ||
          (item.href !== `/${locale}/admin` && pathname.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
