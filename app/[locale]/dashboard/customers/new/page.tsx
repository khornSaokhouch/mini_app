"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createCustomer } from "@/lib/actions"

export default function NewCustomerPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

  const handleSave = () => {
    if (!name) {
      alert("Please fill in the customer's name.")
      return
    }
    
    startTransition(async () => {
      try {
        const res = await createCustomer({ name, email, phone, notes })
        if (res?.success) {
          router.push("../customers")
        }
      } catch (error) {
        console.error(error)
        alert("Failed to create customer")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="../customers">
          <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Customer</h1>
          <p className="text-muted-foreground mt-1">Add a new customer to your store</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name <span className="text-red-500">*</span></Label>
            <Input placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="john@example.com" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input placeholder="+1 234 567 890" value={phone} onChange={e => setPhone(e.target.value)} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <textarea className="w-full min-h-[100px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" placeholder="Any special notes about this customer..." value={notes} onChange={e => setNotes(e.target.value)} disabled={isPending} />
          </div>
          <div className="pt-4 flex gap-4">
            <Button className="flex-1" onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving..." : "Save Customer"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
