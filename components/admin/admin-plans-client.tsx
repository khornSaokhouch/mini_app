"use client"

import { useState } from "react"
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
    setName(""); setDescription(""); setPriceMonthly(""); setPriceYearly("")
    setMaxProducts("50"); setMaxOrders("500"); setMaxStaff("3")
    setIsPopular(false); setFeaturesText("")
    setOpen(true)
  }

  const openEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setName(plan.name); setDescription(plan.description ?? "")
    setPriceMonthly(String(plan.priceMonthly)); setPriceYearly(String(plan.priceYearly))
    setMaxProducts(String(plan.maxProducts)); setMaxOrders(String(plan.maxOrders))
    setMaxStaff(String(plan.maxStaff)); setIsPopular(plan.isPopular)
    setFeaturesText(plan.features.join("\n"))
    setOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const body = {
      name, description,
      priceMonthly: parseFloat(priceMonthly) || 0,
      priceYearly: parseFloat(priceYearly) || 0,
      maxProducts: parseInt(maxProducts) || 50,
      maxOrders: parseInt(maxOrders) || 500,
      maxStaff: parseInt(maxStaff) || 3,
      isPopular,
      features: featuresText.split("\n").map(f => f.trim()).filter(Boolean),
    }
    try {
      const url = editingPlan ? `/api/admin/plans/${editingPlan.id}` : `/api/admin/plans`
      const method = editingPlan ? "PUT" : "POST"
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error("Failed to save plan")
      const saved = await res.json()
      if (editingPlan) {
        setPlans(prev => prev.map(p => p.id === saved.id ? { ...p, ...saved } : p))
        toast.success("Plan updated successfully")
      } else {
        setPlans(prev => [saved, ...prev])
        toast.success("Plan created successfully")
      }
      setOpen(false)
    } catch {
      toast.error("Failed to save plan")
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (plan: Plan) => {
    try {
      const res = await fetch(`/api/admin/plans/${plan.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !plan.isActive })
      })
      if (!res.ok) throw new Error()
      setPlans(prev => prev.map(p => p.id === plan.id ? { ...p, isActive: !p.isActive } : p))
      toast.success(`Plan ${plan.isActive ? "deactivated" : "activated"}`)
    } catch {
      toast.error("Failed to update plan status")
    }
  }

  const deletePlan = async (plan: Plan) => {
    if (!confirm(`Delete plan "${plan.name}"? This cannot be undone.`)) return
    try {
      const res = await fetch(`/api/admin/plans/${plan.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      setPlans(prev => prev.filter(p => p.id !== plan.id))
      toast.success("Plan deleted")
    } catch {
      toast.error("Failed to delete plan")
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Plans</h1>
          <p className="text-muted-foreground mt-1">Define subscription tiers available to store owners</p>
        </div>
        <Button onClick={openCreate} className="gap-2 self-start">
          <Plus className="h-4 w-4" /> New Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Plans", value: plans.length, color: "text-foreground" },
          { label: "Active Plans", value: plans.filter(p => p.isActive).length, color: "text-emerald-500" },
          { label: "Inactive Plans", value: plans.filter(p => !p.isActive).length, color: "text-amber-500" },
          { label: "Total Subscribers", value: plans.reduce((a, p) => a + (p._count?.subscriptions || 0), 0), color: "text-primary" },
        ].map(stat => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Package className="h-14 w-14 opacity-30" />
            <p className="text-lg font-medium">No plans yet</p>
            <Button onClick={openCreate} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> Create your first plan
            </Button>
          </div>
        ) : plans.map(plan => (
          <Card key={plan.id} className={`relative bg-card border-border flex flex-col transition-shadow hover:shadow-md ${plan.isPopular ? "ring-2 ring-primary" : ""}`}>
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground gap-1 px-3 py-0.5 text-xs">
                  <Star className="h-3 w-3 fill-current" /> Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-lg text-foreground">{plan.name}</CardTitle>
                  {plan.description && <CardDescription className="mt-1">{plan.description}</CardDescription>}
                </div>
                <Badge variant="outline" className={plan.isActive ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" : "border-amber-500 text-amber-600 dark:text-amber-400"}>
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              {/* Pricing */}
              <div className="flex gap-4 border-y border-border py-3">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                  <p className="text-xl font-bold text-foreground">${plan.priceMonthly}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Yearly</p>
                  <p className="text-xl font-bold text-foreground">${plan.priceYearly}<span className="text-sm font-normal text-muted-foreground">/yr</span></p>
                </div>
              </div>

              {/* Limits */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: ShoppingBag, label: "Products", value: plan.maxProducts === -1 ? "∞" : plan.maxProducts },
                  { icon: Package, label: "Orders", value: plan.maxOrders === -1 ? "∞" : plan.maxOrders },
                  { icon: UserCheck, label: "Staff", value: plan.maxStaff === -1 ? "∞" : plan.maxStaff },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-muted/50 rounded-lg p-2">
                    <Icon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-bold text-sm text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              {plan.features.length > 0 && (
                <ul className="space-y-1.5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Subscribers */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-3 mt-auto">
                <Users className="h-4 w-4" />
                <span>{plan._count?.subscriptions ?? 0} active subscribers</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => openEdit(plan)}>
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  size="sm" variant="outline"
                  className={`flex-1 gap-1 ${plan.isActive ? "text-amber-600 border-amber-300 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-950/30" : "text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/30"}`}
                  onClick={() => toggleActive(plan)}
                >
                  {plan.isActive ? <ToggleLeft className="h-3.5 w-3.5" /> : <ToggleRight className="h-3.5 w-3.5" />}
                  {plan.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  size="sm" variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => deletePlan(plan)}
                  disabled={(plan._count?.subscriptions ?? 0) > 0}
                  title={(plan._count?.subscriptions ?? 0) > 0 ? "Cannot delete plan with active subscribers" : "Delete plan"}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">{editingPlan ? "Edit Plan" : "Create New Plan"}</DialogTitle>
            <DialogDescription>Configure the plan details and subscription limits.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label>Plan Name</Label>
                <Input placeholder="e.g. Starter, Pro, Enterprise" value={name} onChange={e => setName(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Description</Label>
                <Input placeholder="Short description" value={description} onChange={e => setDescription(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="space-y-1.5">
                <Label>Monthly Price ($)</Label>
                <Input type="number" min="0" step="0.01" placeholder="9.99" value={priceMonthly} onChange={e => setPriceMonthly(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="space-y-1.5">
                <Label>Yearly Price ($)</Label>
                <Input type="number" min="0" step="0.01" placeholder="99.99" value={priceYearly} onChange={e => setPriceYearly(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="space-y-1.5">
                <Label>Max Products (-1 = unlimited)</Label>
                <Input type="number" min="-1" value={maxProducts} onChange={e => setMaxProducts(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="space-y-1.5">
                <Label>Max Orders (-1 = unlimited)</Label>
                <Input type="number" min="-1" value={maxOrders} onChange={e => setMaxOrders(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="space-y-1.5">
                <Label>Max Staff (-1 = unlimited)</Label>
                <Input type="number" min="-1" value={maxStaff} onChange={e => setMaxStaff(e.target.value)} className="bg-background border-border" />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={isPopular} onCheckedChange={setIsPopular} id="popular" />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Features (one per line)</Label>
                <textarea
                  rows={5}
                  placeholder={"Unlimited products\nCustom domain\nPriority support"}
                  value={featuresText}
                  onChange={e => setFeaturesText(e.target.value)}
                  className="w-full rounded-md border border-border bg-background text-foreground text-sm px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving || !name || !priceMonthly}>
                {saving ? "Saving..." : editingPlan ? "Save Changes" : "Create Plan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
