"use client"

import { Store, MoreHorizontal, CheckCircle2, XCircle, Search } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AdminStoresClient({ stores }: { stores: any[] }) {
  const [search, setSearch] = useState("")
  const filtered = stores.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.owner?.name && s.owner.name.toLowerCase().includes(search.toLowerCase())) ||
    (s.owner?.email && s.owner.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50">Tenant Stores</h1>
          <p className="text-slate-400 mt-1">All registered stores on the KhMarket platform</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search stores..."
              className="pl-9 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 w-64"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4"><p className="text-slate-400 text-sm">Total Stores</p><p className="text-2xl font-bold text-slate-50 mt-1">{stores.length}</p></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4"><p className="text-slate-400 text-sm">Active</p><p className="text-2xl font-bold text-emerald-400 mt-1">{stores.length}</p></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4"><p className="text-slate-400 text-sm">Suspended</p><p className="text-2xl font-bold text-red-400 mt-1">0</p></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4"><p className="text-slate-400 text-sm">Total Revenue</p><p className="text-2xl font-bold text-slate-50 mt-1">N/A</p></CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Store</TableHead>
                <TableHead className="text-slate-400">Owner</TableHead>
                <TableHead className="text-slate-400 text-right">Products</TableHead>
                <TableHead className="text-slate-400 text-right">Orders</TableHead>
                <TableHead className="text-slate-400 text-right">Revenue</TableHead>
                <TableHead className="text-slate-400">Plan</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id} className="border-slate-800 hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Store className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{s.name}</p>
                        <p className="text-xs text-slate-500 font-mono">/store/{s.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{s.owner?.name || s.owner?.email || "Unknown"}</TableCell>
                  <TableCell className="text-right text-slate-300">{s._count?.products || 0}</TableCell>
                  <TableCell className="text-right text-slate-300">{s._count?.orders || 0}</TableCell>
                  <TableCell className="text-right font-bold text-slate-200">N/A</TableCell>
                  <TableCell>
                    <Badge className="bg-slate-800 text-slate-400 hover:bg-current border-0">
                      Standard
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /><span className="text-sm">Active</span></div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                        <DropdownMenuItem className="text-slate-200">View Store</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-200">Impersonate Owner</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-slate-500">
                    No stores found.
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
