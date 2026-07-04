"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  Package, Edit2, Trash2, Plus, Check, Star, ToggleLeft, ToggleRight,
  Users, ShoppingBag, UserCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

interface Plan {
  id: string
  name: string
  description: string | null
  priceMonthly: number
  priceYearly: number
  features: string[]
  maxProducts: number
  maxOrders: number
  maxStaff: number
  isActive: boolean
  isPopular: boolean
  sortOrder: number
  _count?: { subscriptions: number }
}

interface AdminPlansClientProps {
  plans: Plan[]
}

export function AdminPlansClient({ plans: initialPlans }: AdminPlansClientProps) {
  const t = useTranslations("AdminPages.plans")
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [open, setOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [priceMonthly, setPriceMonthly] = useState("")
  const [priceYearly, setPriceYearly] = useState("")
  const [maxProducts, setMaxProducts] = useState("50")
  const [maxOrders, setMaxOrders] = useState("500")
  const [maxStaff, setMaxStaff] = useState("3")
  const [isPopular, setIsPopular] = useState(false)
  const [featuresText, setFeaturesText] = useState("")
  const [saving, setSaving] = useState(false)

  const openCreate = () => {
    setEditingPlan(null)
    setName("")
    setDescription("")
    setPriceMonthly("")
    setPriceYearly("")
    setMaxProducts("50")
    setMaxOrders("500")
    setMaxStaff("3")
    setIsPopular(false)
    setFeaturesText("")
    setOpen(true)
  }

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setName(plan.name)
    setDescription(plan.description || "")
    setPriceMonthly(plan.priceMonthly.toString())
    setPriceYearly(plan.priceYearly.toString())
    setMaxProducts(plan.maxProducts.toString())
    setMaxOrders(plan.maxOrders.toString())
    setMaxStaff(plan.maxStaff.toString())
    setIsPopular(plan.isPopular)
    setFeaturesText(plan.features.join("\n"))
    setOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.success("Plan saved successfully")
    setSaving(false)
    setOpen(false)
  }

  const toggleActive = async (plan: Plan) => {
    toast.success("Plan status updated")
  }

  const deletePlan = async (plan: Plan) => {
    toast.success("Plan deleted")
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Plan
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price (M/Y)</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>${plan.priceMonthly} / ${plan.priceYearly}</TableCell>
                  <TableCell>{plan.features.length} features</TableCell>
                  <TableCell>
                    <Switch checked={plan.isActive} onCheckedChange={() => toggleActive(plan)} />
                  </TableCell>
                  <TableCell>
                    {plan.isPopular ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(plan)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deletePlan(plan)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingPlan ? "Edit Plan" : "Create New Plan"}</DialogTitle>
            <DialogDescription>Configure your subscription plan details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Monthly Price ($)</Label>
                <Input type="number" value={priceMonthly} onChange={e => setPriceMonthly(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Yearly Price ($)</Label>
                <Input type="number" value={priceYearly} onChange={e => setPriceYearly(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Popular</Label>
                <div className="flex items-center h-10">
                  <Switch checked={isPopular} onCheckedChange={setIsPopular} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Features (one per line)</Label>
              <Input value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder="Feature 1..." />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Save Plan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
