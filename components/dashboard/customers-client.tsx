"use client"

import { useState, useTransition } from "react"
import { deleteCustomer } from "@/lib/actions"
import { Search, Plus, MoreHorizontal, Users, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Customer { id: string; name: string; email: string; phone: string; orders: number; spent: number; status: string }

export function CustomersClient({ customers }: { customers: Customer[] }) {
  const [search, setSearch] = useState("")
  const [isPending, startTransition] = useTransition()

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )

  const activeCount = customers.filter(c => c.status === "ACTIVE").length
  const totalSpent = customers.reduce((sum, c) => sum + c.spent, 0)
  const avgSpent = customers.length ? (totalSpent / customers.length) : 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your customer relationships and history</p>
        </div>
        <Link href="./customers/new">
          <Button className="gap-2 w-full sm:w-auto"><Plus className="h-4 w-4" /> Add Customer</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Customers</p><p className="text-2xl font-bold mt-1">{customers.length}</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Active Customers</p><p className="text-2xl font-bold mt-1 text-green-600">{activeCount}</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Average Value</p><p className="text-2xl font-bold mt-1">${avgSpent.toFixed(2)}</p></CardContent></Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">{customers.length === 0 ? "No customers yet" : "No results found"}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">{c.name[0]}</div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs"><Mail className="mr-1 h-3 w-3" />{c.email}</div>
                        {c.phone !== "—" && <div className="flex items-center text-xs text-muted-foreground"><Phone className="mr-1 h-3 w-3" />{c.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell>{c.orders}</TableCell>
                    <TableCell className="text-right font-bold">${c.spent.toFixed(2)}</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-100">{c.status}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            if (confirm("Are you sure you want to delete this customer?")) {
                              startTransition(async () => {
                                await deleteCustomer(c.id)
                              })
                            }
                          }} disabled={isPending}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
