"use client"

import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Shield, ChevronLeft, ChevronRight, LogOut } from "lucide-react"
import { AdminSidebarNav } from "./admin-sidebar-nav"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface AdminSidebarProps {
  locale: string
}

export function AdminSidebar({ locale }: AdminSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const t = useTranslations("AdminSidebar")

  return (
    <aside className={`${isExpanded ? "w-64" : "w-20"} border-r border-border bg-card flex flex-col hidden md:flex sticky top-0 h-screen shrink-0 transition-all duration-300`}>
      <div className={`h-16 flex items-center px-6 border-b border-border gap-3 ${isExpanded ? "justify-between" : "justify-center"}`}>
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded p-1.5"><Shield className="h-4 w-4 text-primary-foreground" /></div>
          {isExpanded && <span className="font-bold text-lg tracking-tight text-foreground">Admin</span>}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      <AdminSidebarNav locale={locale} isExpanded={isExpanded} />
      <div className="mt-auto p-4 border-t border-border">
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogTrigger className={cn(
            buttonVariants({ variant: "ghost" }),
            `w-full ${isExpanded ? "justify-start" : "justify-center"} gap-3`
          )}>
            <LogOut className="h-4 w-4" />
            {isExpanded && <span>{t("logout")}</span>}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("confirmLogout")}</DialogTitle>
              <DialogDescription>{t("confirmLogoutDescription")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>{t("cancel")}</Button>
              <Button variant="destructive" onClick={() => signOut({ callbackUrl: `/${locale}/admin-login` })}>{t("confirm")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  )
}
