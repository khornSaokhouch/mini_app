"use client"

import { Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

interface AdminHeaderProps {
  locale: string
  adminName: string
}

export function AdminHeader({ locale, adminName }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 md:hidden">
        <div className="bg-primary rounded p-1"><Shield className="h-4 w-4 text-primary-foreground" /></div>
        <span className="font-bold text-sm tracking-tight text-foreground">Admin</span>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <LanguageSwitcher locale={locale} />
        <ThemeToggle />
        <div className="flex items-center gap-3 text-sm border-l border-border pl-4">
          <span className="text-muted-foreground hidden sm:inline">{adminName}</span>
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold text-xs text-primary-foreground">
            {adminName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  )
}
