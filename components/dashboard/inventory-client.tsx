"use client"

import { AlertTriangle, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

export interface InventoryItem {
  id: string
  name: string
  sku: string | null
  qty: number
  minQty: number
  status: string
  image?: string
}

export function InventoryClient({ stock }: { stock: InventoryItem[] }) {
  // A simple client component that renders the inventory data without movements
  const lowStockCount = stock.filter(s => s.status !== "OK").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground mt-1">Track stock levels across your products</p>
      </div>

      {lowStockCount > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 p-4">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-800 dark:text-yellow-400">{lowStockCount} item(s) need attention</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">Some products are low on stock or completely out. Restock them soon to avoid lost sales.</p>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">In Stock</TableHead>
                <TableHead className="text-right">Min. Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No products found in inventory
                  </TableCell>
                </TableRow>
              ) : (
                stock.map(item => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} width={32} height={32} className="object-cover w-full h-full" unoptimized />
                          ) : (
                            <Package className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku || "—"}</TableCell>
                    <TableCell className="text-right font-bold">{item.qty}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{item.minQty}</TableCell>
                    <TableCell>
                      {item.status === "OK" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>}
                      {item.status === "LOW" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>}
                      {item.status === "OUT" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
