"use client"

import { useState } from "react"
import { Search, CreditCard, ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface PaymentItem {
  id: string
  orderId: string
  amount: number
  method: string
  date: string
  status: string
}

export function PaymentsClient({ payments }: { payments: PaymentItem[] }) {
  const [search, setSearch] = useState("")

  const filtered = payments.filter(p => 
    p.id.toLowerCase().includes(search.toLowerCase()) || 
    p.orderId.toLowerCase().includes(search.toLowerCase())
  )

  const totalProcessed = payments.filter(p => p.status === "COMPLETED" || p.status === "PAID").reduce((a, b) => a + b.amount, 0)
  const pendingClearance = payments.filter(p => p.status === "PENDING").reduce((a, b) => a + b.amount, 0)
  const failedCount = payments.filter(p => p.status === "FAILED").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">View and manage all financial transactions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" /> Sync Gateway
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Processed</p>
                <p className="text-2xl font-bold mt-1">${totalProcessed.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Pending Clearance</p>
                <p className="text-2xl font-bold mt-1">${pendingClearance.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg">
                <RefreshCcw className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Failed Transactions</p>
                <p className="text-2xl font-bold mt-1">{failedCount}</p>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
                <ArrowDownRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transaction ID..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Order Ref</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No payment transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(payment => (
                  <TableRow key={payment.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{payment.id.slice(-8).toUpperCase()}</TableCell>
                    <TableCell className="text-primary font-medium">{payment.orderId.slice(-8).toUpperCase()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>{payment.method}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{payment.date}</TableCell>
                    <TableCell className="text-right font-semibold">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {(payment.status === "COMPLETED" || payment.status === "PAID") && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>}
                      {payment.status === "PENDING" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>}
                      {payment.status === "FAILED" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>}
                      {payment.status === "REFUNDED" && <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Refunded</Badge>}
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
