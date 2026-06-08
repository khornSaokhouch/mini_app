"use client"

import { useState } from "react"
import { Users, Search, MoreHorizontal, ShieldCheck, User, UserCog } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const roleConfig: Record<string, { label: string, icon: any, color: string }> = {
  SUPER_ADMIN:  { label: "Super Admin",  icon: ShieldCheck, color: "bg-indigo-900/50 text-indigo-300" },
  STORE_OWNER:  { label: "Store Owner",  icon: UserCog,     color: "bg-purple-900/50 text-purple-300" },
  STAFF:        { label: "Staff",        icon: User,        color: "bg-slate-800 text-slate-300" },
  CUSTOMER:     { label: "Customer",     icon: User,        color: "bg-slate-800 text-slate-400" },
}

export function AdminUsersClient({ users }: { users: any[] }) {
  const [search, setSearch] = useState("")
  const filtered = users.filter(u => 
    (u.name && u.name.toLowerCase().includes(search.toLowerCase())) || 
    (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Global Users</h1>
          <p className="text-slate-400 mt-1">All users registered on the KhMarket platform</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search users..."
            className="pl-9 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, color: "text-slate-50" },
          { label: "Store Owners", value: users.filter(u=>u.role==="STORE_OWNER").length, color: "text-purple-400" },
          { label: "Staff", value: users.filter(u=>u.role==="STAFF").length, color: "text-blue-400" },
          { label: "Customers", value: users.filter(u=>u.role==="CUSTOMER").length, color: "text-slate-400" },
        ].map(stat => (
          <Card key={stat.label} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">User</TableHead>
                <TableHead className="text-slate-400">Role</TableHead>
                <TableHead className="text-slate-400">Joined</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => {
                const role = roleConfig[u.role] || roleConfig.CUSTOMER
                const RoleIcon = role.icon
                return (
                  <TableRow key={u.id} className="border-slate-800 hover:bg-slate-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-slate-200 shrink-0">
                          {u.name?.[0] || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{u.name || "Unknown"}</p>
                          <p className="text-xs text-slate-500">{u.email || "No email"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${role.color} border-0 hover:bg-current gap-1`}>
                        <RoleIcon className="h-3 w-3" />
                        {role.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">{new Date(u.createdAt || Date.now()).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Active</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                          <DropdownMenuItem className="text-slate-200">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-200">Change Role</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-slate-500">
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
