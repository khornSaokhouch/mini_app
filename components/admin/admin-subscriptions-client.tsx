"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Search, MoreHorizontal, Calendar, CreditCard, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface Subscription {
  id: string
  status: string
  interval: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelledAt: string | null
  trialEndsAt: string | null
  createdAt: string
  user: { id: string; name: string | null; email: string | null }
  plan: { id: string; name: string; priceMonthly: number; priceYearly: number }
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  ACTIVE:    { label: "Active",    icon: CheckCircle2, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400" },
  TRIALING:  { label: "Trialing",  icon: Clock,        color: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400" },
  PAST_DUE:  { label: "Past Due",  icon: AlertCircle,  color: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400" },
  CANCELLED: { label: "Cancelled", icon: XCircle,      color: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400" },
  EXPIRED:   { label: "Expired",   icon: XCircle,      color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400" },
}

export function AdminSubscriptionsClient({ subscriptions: initialSubs }: { subscriptions: Subscription[] }) {
  const t = useTranslations("AdminPages.subscriptions")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [subs, setSubs] = useState(initialSubs)

  const filtered = subs.filter(s => {
    const matchesSearch = s.user.name?.toLowerCase().includes(search.toLowerCase()) || s.user.email?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const cancelSub = async (sub: Subscription) => {
    // Placeholder for actual cancellation logic
    toast.success("Subscription cancelled")
  }

  const statusTabs = ["ALL", "ACTIVE", "TRIALING", "PAST_DUE", "CANCELLED", "EXPIRED"]

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
      </div>

      <Card className="bg-card border-border text-card-foreground">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="font-semibold">{sub.user.name || "N/A"}</div>
                    <div className="text-xs text-muted-foreground">{sub.user.email}</div>
                  </TableCell>
                  <TableCell>{sub.plan.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusConfig[sub.status]?.color || ""}>
                      {statusConfig[sub.status]?.label || sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(sub.currentPeriodStart).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">{new Date(sub.currentPeriodEnd).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => cancelSub(sub)}>Cancel Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
