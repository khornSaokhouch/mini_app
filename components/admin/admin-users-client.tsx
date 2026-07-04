"use client"
import { useTranslations } from "next-intl"

import { useState } from "react"
import { Search, MoreHorizontal, ShieldCheck, User, UserCog } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const roleConfig: Record<string, { label: string, icon: any, color: string }> = {
  SUPER_ADMIN:  { label: "Super Admin",  icon: ShieldCheck, color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300" },
  STORE_OWNER:  { label: "Store Owner",  icon: UserCog,     color: "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300" },
  STAFF:        { label: "Staff",        icon: User,        color: "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300" },
  CUSTOMER:     { label: "Customer",     icon: User,        color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
}

export function AdminUsersClient({ users }: { users: any[] }) {
  const t = useTranslations("AdminPages.users")
  const [search, setSearch] = useState("")
  const filtered = users.filter(u => 
    (u.name && u.name.toLowerCase().includes(search.toLowerCase())) || 
    (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground w-full sm:w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, color: "text-foreground" },
          { label: "Store Owners", value: users.filter(u=>u.role==="STORE_OWNER").length, color: "text-purple-600 dark:text-purple-400" },
          { label: "Staff", value: users.filter(u=>u.role==="STAFF").length, color: "text-blue-600 dark:text-blue-400" },
          { label: "Customers", value: users.filter(u=>u.role==="CUSTOMER").length, color: "text-muted-foreground" },
        ].map(stat => (
          <Card key={stat.label} className="bg-card border-border text-card-foreground">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border text-card-foreground">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">User</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Role</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Joined</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => {
                const role = roleConfig[u.role] || roleConfig.CUSTOMER
                const RoleIcon = role.icon
                return (
                  <TableRow key={u.id} className="border-border hover:bg-muted/40 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {u.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{u.name || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{u.email || "No email"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${role.color} border-0 hover:bg-current gap-1`}>
                        <RoleIcon className="h-3 w-3" />
                        {role.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(u.createdAt || Date.now()).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-500 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground">
                          <DropdownMenuItem className="cursor-pointer hover:bg-muted">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer hover:bg-muted">Change Role</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No users found.
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
