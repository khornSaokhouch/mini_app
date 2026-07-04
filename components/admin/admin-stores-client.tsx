"use client"
import { useTranslations } from "next-intl"

import { Store, MoreHorizontal, CheckCircle2, Search } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AdminStoresClient({ stores }: { stores: any[] }) {
  const t = useTranslations("AdminPages.stores")
  const [search, setSearch] = useState("")
  const filtered = stores.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.owner?.name && s.owner.name.toLowerCase().includes(search.toLowerCase())) ||
    (s.owner?.email && s.owner.email.toLowerCase().includes(search.toLowerCase()))
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
            placeholder="Search stores..."
            className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground w-full sm:w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border text-card-foreground">
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Total Stores</p>
            <p className="text-2xl font-bold text-foreground mt-1">{stores.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-card-foreground">
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Active</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">{stores.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-card-foreground">
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Suspended</p>
            <p className="text-2xl font-bold text-red-500 mt-1">0</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border text-card-foreground">
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-foreground mt-1">N/A</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border text-card-foreground">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">Store</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Owner</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Products</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Orders</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Revenue</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Plan</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id} className="border-border hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Store className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">/store/{s.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground/90">{s.owner?.name || s.owner?.email || "Unknown"}</TableCell>
                  <TableCell className="text-right text-foreground/90">{s._count?.products || 0}</TableCell>
                  <TableCell className="text-right text-foreground/90">{s._count?.orders || 0}</TableCell>
                  <TableCell className="text-right font-bold text-foreground">N/A</TableCell>
                  <TableCell>
                    <Badge className="bg-muted text-muted-foreground hover:bg-muted border-0">
                      Standard
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span className="text-sm">Active</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground">
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">View Store</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">Impersonate Owner</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
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
