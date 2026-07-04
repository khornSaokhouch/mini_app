"use client"
import { useTranslations } from "next-intl"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Store, Users, Settings, Package, CreditCard } from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: any
}

export function AdminSidebarNav({ locale, isExpanded }: { locale: string; isExpanded: boolean }) {
  const t = useTranslations("AdminSidebar")
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      href: `/${locale}/admin`,
      label: t("dashboard"),
      icon: BarChart,
    },
    {
      href: `/${locale}/admin/stores`,
      label: t("manageStore"),
      icon: Store,
    },
    {
      href: `/${locale}/admin/users`,
      label: t("manageUser"),
      icon: Users,
    },
    {
      href: `/${locale}/admin/plans`,
      label: t("managePlans"),
      icon: Package,
    },
    {
      href: `/${locale}/admin/subscriptions`,
      label: t("subscriptions"),
      icon: CreditCard,
    },
    {
      href: `/${locale}/admin/settings`,
      label: t("setting"),
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
            {isExpanded && item.label}
          </Link>
        )
      })}
    </nav>
  )
}
