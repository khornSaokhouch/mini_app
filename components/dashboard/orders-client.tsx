"use client"

import { useState, useTransition } from "react"
import { updateOrderStatus, deleteOrder } from "@/lib/actions"
import { Search, MoreHorizontal, ShoppingCart, User, Phone, StickyNote, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

interface Order { 
  id: string; 
  customer: string; 
  customerPhone?: string | null;
  customerNotes?: string | null;
  items: number; 
  itemsList: { productName: string; quantity: number; price: number }[];
  total: number; 
  date: string; 
  status: string; 
}

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search)
    const matchTab = tab === "ALL" || o.status === tab
    return matchSearch && matchTab
  })

  const handleUpdateStatus = (id: string, status: string) => {
    startTransition(async () => { 
      try {
        await updateOrderStatus(id, status)
        toast.success(`Order marked as ${status}`)
      } catch (error) {
        toast.error("Failed to update order status")
      }
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      startTransition(async () => { 
        try {
          await deleteOrder(id)
          toast.success("Order deleted successfully")
        } catch (error) {
          toast.error("Failed to delete order")
        }
      })
    }
  }

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
                              <DropdownMenuItem onClick={() => setSelectedOrder(order)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => handleUpdateStatus(order.id, "PROCESSING")}>Mark Processing</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => handleUpdateStatus(order.id, "SHIPPED")}>Mark Shipped</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => handleUpdateStatus(order.id, "DELIVERED")}>Mark Delivered</DropdownMenuItem>
                              <DropdownMenuItem disabled={isPending} onClick={() => handleUpdateStatus(order.id, "CANCELLED")}>Mark Cancelled</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" disabled={isPending} onClick={() => handleDelete(order.id)}>Delete</DropdownMenuItem>
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

      {/* Order Details Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <SheetContent className="w-full sm:max-w-xl flex flex-col h-full overflow-hidden p-0">
          <div className="p-6 pb-4 border-b">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-xl">
                Order Details
                <Badge variant="outline" className={`${selectedOrder ? statusColors[selectedOrder.status] : ""} ml-2 font-semibold`}>
                  {selectedOrder?.status}
                </Badge>
              </SheetTitle>
              <SheetDescription className="font-mono text-xs mt-1">
                ID: {selectedOrder?.id}
              </SheetDescription>
            </SheetHeader>
          </div>

          {selectedOrder && (
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Customer Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <User className="h-4 w-4" />
                  Customer Information
                </h4>
                <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3 shadow-sm">
                  <div className="grid grid-cols-3 items-center text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium col-span-2 text-right">{selectedOrder.customer}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center text-sm">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium col-span-2 text-right">{selectedOrder.customerPhone || "N/A"}</span>
                  </div>
                  {selectedOrder.customerNotes && (
                    <>
                      <Separator className="my-2" />
                      <div className="text-sm">
                        <span className="text-muted-foreground mb-1 block">Notes / Address</span>
                        <p className="text-sm leading-relaxed text-foreground/90">{selectedOrder.customerNotes}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <Package className="h-4 w-4" />
                  Order Items
                </h4>
                <div className="rounded-xl border border-border/50 bg-card shadow-sm divide-y divide-border/50">
                  {selectedOrder.itemsList.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {item.quantity}x
                        </div>
                        <span className="font-medium text-foreground">{item.productName}</span>
                      </div>
                      <span className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedOrder && (
            <div className="p-6 bg-muted/30 border-t mt-auto">
              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-base font-semibold text-muted-foreground">Total Amount</span>
                <span className="text-3xl font-black text-primary tracking-tight">${selectedOrder.total.toFixed(2)}</span>
              </div>
              
              {/* Actions */}
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full font-semibold"
                  onClick={() => handleUpdateStatus(selectedOrder.id, "PROCESSING")}
                  disabled={isPending || selectedOrder.status === "PROCESSING"}
                >
                  Process
                </Button>
                <Button 
                  className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleUpdateStatus(selectedOrder.id, "SHIPPED")}
                  disabled={isPending || selectedOrder.status === "SHIPPED"}
                >
                  Ship
                </Button>
                <Button 
                  className="w-full font-semibold bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20" 
                  onClick={() => handleUpdateStatus(selectedOrder.id, "DELIVERED")}
                  disabled={isPending || selectedOrder.status === "DELIVERED"}
                >
                  Deliver
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
