"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Calendar, CreditCard, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

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
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [subs, setSubs] = useState(initialSubs)

  const filtered = subs.filter(s => {
    const matchSearch =
      (s.user?.name?.toLowerCase().includes(search.toLowerCase())) ||
      (s.user?.email?.toLowerCase().includes(search.toLowerCase())) ||
      (s.plan?.name?.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = statusFilter === "ALL" || s.status === statusFilter
    return matchSearch && matchStatus
  })

  const cancelSub = async (sub: Subscription) => {
    if (!confirm(`Cancel ${sub.user?.name ?? "this user"}'s subscription?`)) return
    try {
      const res = await fetch(`/api/admin/subscriptions/${sub.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" })
      })
      if (!res.ok) throw new Error()
      setSubs(prev => prev.map(s => s.id === sub.id ? { ...s, status: "CANCELLED", cancelledAt: new Date().toISOString() } : s))
      toast.success("Subscription cancelled")
    } catch {
      toast.error("Failed to cancel subscription")
    }
  }

  const statusTabs = ["ALL", "ACTIVE", "TRIALING", "PAST_DUE", "CANCELLED", "EXPIRED"]

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Subscriptions</h1>
          <p className="text-muted-foreground mt-1">Manage all platform subscriptions and billing</p>
        </div>
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user or plan..."
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground w-full sm:w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["ALL", ...Object.keys(statusConfig)].map((s) => {
          const count = s === "ALL" ? subs.length : subs.filter(x => x.status === s).length
          const cfg = statusConfig[s]
          return (
            <Card
              key={s}
              className={`bg-card border-border cursor-pointer transition-all ${statusFilter === s ? "ring-2 ring-primary" : "hover:border-border/80"}`}
              onClick={() => setStatusFilter(s)}
            >
              <CardContent className="p-4">
                <p className="text-muted-foreground text-xs font-medium">{cfg?.label ?? "Total"}</p>
                <p className={`text-2xl font-bold mt-1 ${s === "ALL" ? "text-foreground" : s === "ACTIVE" ? "text-emerald-500" : s === "TRIALING" ? "text-blue-500" : s === "PAST_DUE" ? "text-amber-500" : "text-red-500"}`}>{count}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Table */}
      <Card className="bg-card border-border text-card-foreground">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">User</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Plan</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Interval</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Amount</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Period</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(sub => {
                const sc = statusConfig[sub.status] ?? statusConfig.EXPIRED
                const StatusIcon = sc.icon
                const price = sub.interval === "MONTHLY" ? sub.plan.priceMonthly : sub.plan.priceYearly
                const periodEnd = new Date(sub.currentPeriodEnd)
                const daysLeft = Math.ceil((periodEnd.getTime() - Date.now()) / 86400000)

                return (
                  <TableRow key={sub.id} className="border-border hover:bg-muted/40 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {sub.user?.name?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{sub.user?.name ?? "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{sub.user?.email ?? "—"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">{sub.plan?.name ?? "—"}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs capitalize">
                        <CreditCard className="h-3 w-3 mr-1" />
                        {sub.interval === "MONTHLY" ? "Monthly" : "Yearly"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${sc.color} border-0 gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {sc.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      ${price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className={daysLeft < 7 && sub.status === "ACTIVE" ? "text-amber-500 font-medium" : "text-muted-foreground"}>
                          {sub.status === "CANCELLED" || sub.status === "EXPIRED"
                            ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                            : daysLeft > 0
                              ? `${daysLeft}d left`
                              : "Expired"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground">
                          <DropdownMenuItem className="cursor-pointer hover:bg-muted">View Details</DropdownMenuItem>
                          {sub.status === "ACTIVE" && (
                            <DropdownMenuItem
                              className="cursor-pointer text-destructive hover:bg-destructive/10"
                              onClick={() => cancelSub(sub)}
                            >
                              Cancel Subscription
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
