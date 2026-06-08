"use client"

import { useState, useTransition } from "react"
import { deleteProduct } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Package, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Product {
  id: string; name: string; sku: string; category: string; price: number; stock: number; status: string; image?: string
}

export function ProductsClient({ locale, products }: { locale: string; products: Product[] }) {
  const [search, setSearch] = useState("")
  const [isPending, startTransition] = useTransition()

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const total = products.length
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length
  const outOfStock = products.filter((p) => p.stock === 0).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your store's product catalog</p>
        </div>
        <Link href={`/${locale}/dashboard/products/new`}>
          <Button className="gap-2 w-full sm:w-auto"><Plus className="h-4 w-4" /> Add Product</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Products</p><p className="text-2xl font-bold mt-1">{total}</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Low Stock</p><p className="text-2xl font-bold mt-1 text-yellow-600">{lowStock}</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Out of Stock</p><p className="text-2xl font-bold mt-1 text-red-600">{outOfStock}</p></CardContent></Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">{products.length === 0 ? "No products yet" : "No results found"}</p>
              {products.length === 0 && <Link href={`/${locale}/dashboard/products/new`}><Button className="mt-4" size="sm">Add your first product</Button></Link>}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead><TableHead>SKU</TableHead><TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead><TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead><TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                          {product.image
                            ? <Image src={product.image} alt={product.name} width={36} height={36} className="object-cover w-full h-full" unoptimized />
                            : <Package className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <div><p className="font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{product.id.slice(-8)}</p></div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                    <TableCell className="text-right font-semibold">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>
                      {product.stock > 5 && <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" />Active</Badge>}
                      {product.stock > 0 && product.stock <= 5 && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Low Stock</Badge>}
                      {product.stock === 0 && <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" />Out of Stock</Badge>}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Link href={`/${locale}/dashboard/products/${product.id}/edit`} className="w-full">Edit</Link></DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            if (confirm("Are you sure you want to delete this product?")) {
                              startTransition(async () => {
                                await deleteProduct(product.id)
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
