"use client"

import { useState, useTransition } from "react"
import { updateOrderStatus, deleteOrder } from "@/lib/actions"
import { Search, MoreHorizontal, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Order { id: string; customer: string; items: number; total: number; date: string; status: string }

const statusColors: Record<string, string> = {
  DELIVERED: "bg-green-100 text-green-800", SHIPPED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800", CONFIRMED: "bg-indigo-100 text-indigo-800",
  PENDING: "bg-yellow-100 text-yellow-800", CANCELLED: "bg-red-100 text-red-800",
}

const TABS = ["ALL","PENDING","CONFIRMED","PROCESSING","SHIPPED","DELIVERED","CANCELLED"]

export function OrdersClient({ orders }: { orders: Order[] }) {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("ALL")
  const [isPending, startTransition] = useTransition()

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search)
    const matchTab = tab === "ALL" || o.status === tab
    return matchSearch && matchTab
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1">Track and manage all customer orders</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1">
          {TABS.map((s) => (
            <TabsTrigger key={s} value={s} className="capitalize text-xs">
              {s.toLowerCase()} {s !== "ALL" && <span className="ml-1 opacity-60">({orders.filter(o => o.status === s).length})</span>}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingCart className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">{orders.length === 0 ? "No orders yet" : "No results found"}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Items</TableHead>
                      <TableHead>Date</TableHead><TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead><TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50">
                        <TableCell className="font-mono text-sm font-semibold">{order.id.slice(-8).toUpperCase()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">{order.customer[0]}</div>
                            {order.customer}
                          </div>
                        </TableCell>
                        <TableCell><div className="flex items-center gap-1"><ShoppingCart className="h-3 w-3 text-muted-foreground" />{order.items}</div></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                        <TableCell className="text-right font-bold">${order.total.toFixed(2)}</TableCell>
                        <TableCell><Badge className={`${statusColors[order.status] ?? ""} hover:bg-current`}>{order.status}</Badge></TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem disabled={isPending}>View Details</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => {
                                startTransition(async () => { await updateOrderStatus(order.id, "PROCESSING") })
                              }}>Mark Processing</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => {
                                startTransition(async () => { await updateOrderStatus(order.id, "SHIPPED") })
                              }}>Mark Shipped</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => {
                                startTransition(async () => { await updateOrderStatus(order.id, "DELIVERED") })
                              }}>Mark Delivered</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" disabled={isPending} onClick={() => {
                                if (confirm("Are you sure you want to delete this order?")) {
                                  startTransition(async () => { await deleteOrder(order.id) })
                                }
                              }}>Delete</DropdownMenuItem>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
