"use client"

import { useState, useTransition } from "react"
import { Save, Store, User, Lock, Bell, Smartphone, RefreshCw, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { updateStore } from "@/lib/actions"
import { toast } from "sonner"

export function SettingsClient({ store, user }: { store: any, user: any }) {
  const [isPending, startTransition] = useTransition()
  
  const [name, setName] = useState(store?.name || "")
  const [slug, setSlug] = useState(store?.slug || "")
  const [currency, setCurrency] = useState(store?.currency || "USD")
  const [language, setLanguage] = useState(store?.language || "en")
  const [bakongLink, setBakongLink] = useState(store?.bakongLink || "")
  const [abaMerchantLink, setAbaMerchantLink] = useState(store?.abaMerchantLink || "")
  const [telegramBot, setTelegramBot] = useState(store?.telegramBot || "")

  const handleSaveStore = () => {
    startTransition(async () => {
      const res = await updateStore({
        name,
        slug,
        currency,
        language,
        bakongLink,
        abaMerchantLink,
        telegramBot,
      })
      if (res.success) {
        toast.success("Store settings updated")
      } else {
        toast.error(res.error || "Failed to update settings")
      }
    })
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store configuration and preferences</p>
      </div>

      <Tabs defaultValue="store">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="store" className="gap-2"><Store className="h-4 w-4" />Store</TabsTrigger>
          <TabsTrigger value="payment" className="gap-2"><CreditCard className="h-4 w-4" />Payment</TabsTrigger>
          <TabsTrigger value="account" className="gap-2"><User className="h-4 w-4" />Account</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Lock className="h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="telegram" className="gap-2"><Smartphone className="h-4 w-4" />Telegram</TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store" className="mt-6 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store's public-facing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} disabled={isPending} />
                </div>
                <div className="space-y-2">
                  <Label>Store Slug</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-muted text-muted-foreground">/store/</span>
                    <Input value={slug} onChange={e => setSlug(e.target.value)} className="rounded-l-none" disabled={isPending} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input value={currency} onChange={e => setCurrency(e.target.value)} disabled={isPending} />
                </div>
                <div className="space-y-2">
                  <Label>Store Language</Label>
                  <Input value={language} onChange={e => setLanguage(e.target.value)} disabled={isPending} />
                </div>
              </div>
              <Button onClick={handleSaveStore} disabled={isPending} className="gap-2">
                {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="mt-6 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Payment Links</CardTitle>
              <CardDescription>Configure your Bakong and ABA Merchant payment links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Bakong Personal/Merchant Link</Label>
                <Input 
                  placeholder="https://bakong.kh/..." 
                  value={bakongLink} 
                  onChange={e => setBakongLink(e.target.value)} 
                  disabled={isPending} 
                />
                <p className="text-xs text-muted-foreground">Used for generating Bakong QR codes or direct checkout.</p>
              </div>
              <div className="space-y-2">
                <Label>ABA Merchant Link</Label>
                <Input 
                  placeholder="https://pay.ababank.com/..." 
                  value={abaMerchantLink} 
                  onChange={e => setAbaMerchantLink(e.target.value)} 
                  disabled={isPending} 
                />
                <p className="text-xs text-muted-foreground">Your ABA PayWay or Merchant checkout link.</p>
              </div>
              <Button onClick={handleSaveStore} disabled={isPending} className="gap-2">
                {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isPending ? "Saving..." : "Save Payment Links"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="mt-6 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue={user?.email || ""} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="" />
                </div>
              </div>
              <Button onClick={handleSaveStore} disabled={isPending} className="gap-2">
                {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Use a strong password to protect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <Button onClick={handleSaveStore} disabled={isPending} className="gap-2">
                {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />} 
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what events you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "New Orders", desc: "Get notified when a customer places a new order" },
                { label: "Low Stock Alerts", desc: "Get alerted when a product falls below minimum stock" },
                { label: "Payment Received", desc: "Get notified when a payment is confirmed" },
                { label: "Failed Payments", desc: "Get notified about failed or declined payments" },
              ].map(n => (
                <div key={n.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{n.label}</p>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Telegram */}
        <TabsContent value="telegram" className="mt-6 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Telegram Bot Integration</CardTitle>
              <CardDescription>Connect a Telegram Bot to enable your store's Mini App</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-300">
                Create a bot via <strong>@BotFather</strong> on Telegram, then paste your Bot Token below to connect your Mini App storefront.
              </div>
              <div className="space-y-2">
                <Label>Bot Token</Label>
                <Input 
                  placeholder="123456789:AAF_your_bot_token_here" 
                  value={telegramBot}
                  onChange={e => setTelegramBot(e.target.value)}
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label>Mini App URL (Auto-generated)</Label>
                <Input disabled defaultValue={`https://khmarket.com/en/store/${store?.slug || "my-store"}`} />
              </div>
              <Button onClick={handleSaveStore} disabled={isPending} className="gap-2">
                {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Smartphone className="h-4 w-4" />}
                {isPending ? "Saving..." : "Save Bot Token"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
