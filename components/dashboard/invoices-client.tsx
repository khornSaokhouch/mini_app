"use client"

import { Download, MoreHorizontal, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface InvoiceItem {
  id: string
  orderId: string
  customer: string
  amount: number
  date: string
  due: string
  status: string
}

export function InvoicesClient({ invoices }: { invoices: InvoiceItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage billing and payment documents</p>
        </div>
        <Button className="gap-2"><Download className="h-4 w-4" /> Export All</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Invoiced</p><p className="text-2xl font-bold mt-1">${invoices.reduce((a,i)=>a+i.amount,0).toFixed(2)}</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Paid</p><p className="text-2xl font-bold mt-1 text-green-600">${invoices.filter(i=>i.status==="PAID").reduce((a,i)=>a+i.amount,0).toFixed(2)}</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Overdue</p><p className="text-2xl font-bold mt-1 text-red-600">{invoices.filter(i=>i.status==="OVERDUE").length}</p></CardContent></Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No invoices generated yet
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map(inv => (
                  <TableRow key={inv.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-mono text-sm font-semibold">{inv.id.slice(-8).toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-primary font-medium">{inv.orderId.slice(-8).toUpperCase()}</TableCell>
                    <TableCell>{inv.customer}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inv.due}</TableCell>
                    <TableCell className="text-right font-bold">${inv.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {inv.status === "PAID" && <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>}
                      {inv.status === "PENDING" && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>}
                      {inv.status === "OVERDUE" && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Send to Customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
