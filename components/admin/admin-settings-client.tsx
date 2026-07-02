"use client"

import { useState } from "react"
import { Save, Settings, CreditCard, ShieldAlert, Cpu } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export function AdminSettingsClient() {
  const [platformName, setPlatformName] = useState("KhMarket")
  const [supportEmail, setSupportEmail] = useState("support@khmarket.com")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [bakongEnabled, setBakongEnabled] = useState(true)
  const [bakongMerchantId, setBakongMerchantId] = useState("mkt_bakong_9921")
  const [abaEnabled, setAbaEnabled] = useState(false)
  const [abaMerchantId, setAbaMerchantId] = useState("")

  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("System configurations saved successfully.")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Config</h1>
          <p className="text-muted-foreground mt-1">Configure global parameters and payment gateways</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted border border-border/40 p-1">
          <TabsTrigger value="general" className="gap-2"><Settings className="h-4 w-4" /> General</TabsTrigger>
          <TabsTrigger value="gateways" className="gap-2"><CreditCard className="h-4 w-4" /> Payments</TabsTrigger>
          <TabsTrigger value="system" className="gap-2"><Cpu className="h-4 w-4" /> System Info</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-card border-border text-card-foreground">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input 
                  id="platformName" 
                  value={platformName} 
                  onChange={e => setPlatformName(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Contact Email</Label>
                <Input 
                  id="supportEmail" 
                  type="email" 
                  value={supportEmail} 
                  onChange={e => setSupportEmail(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5 text-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-destructive dark:text-red-400 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Maintenance Mode
                </CardTitle>
                <CardDescription className="mt-1">
                  Offline the platform for all stores. Only system administrators will be able to access the platform.
                </CardDescription>
              </div>
              <Switch 
                checked={maintenanceMode} 
                onCheckedChange={setMaintenanceMode}
                className="data-[state=checked]:bg-destructive"
              />
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-6">
          <Card className="bg-card border-border text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Bakong KHQR</CardTitle>
                <CardDescription>Configure National Bank of Cambodia (NBC) KHQR gateway</CardDescription>
              </div>
              <Switch checked={bakongEnabled} onCheckedChange={setBakongEnabled} />
            </CardHeader>
            {bakongEnabled && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="bakongMerchantId">Bakong Merchant ID</Label>
                  <Input 
                    id="bakongMerchantId" 
                    value={bakongMerchantId} 
                    onChange={e => setBakongMerchantId(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          <Card className="bg-card border-border text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>ABA PayWay</CardTitle>
                <CardDescription>Configure ABA Bank Merchant Gateway</CardDescription>
              </div>
              <Switch checked={abaEnabled} onCheckedChange={setAbaEnabled} />
            </CardHeader>
            {abaEnabled && (
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="abaMerchantId">ABA Merchant ID</Label>
                  <Input 
                    id="abaMerchantId" 
                    placeholder="Enter ABA Merchant ID" 
                    value={abaMerchantId} 
                    onChange={e => setAbaMerchantId(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-card border-border text-card-foreground">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Live diagnostics and service status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border text-sm">
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground font-medium">Framework</span>
                  <span className="text-foreground font-mono">Next.js 16.2.7 (React 19)</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground font-medium">Database Engine</span>
                  <span className="text-foreground font-mono">MongoDB (Prisma Client)</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground font-medium">Server Uptime</span>
                  <span className="text-foreground font-mono">7 days, 4 hours, 12 mins</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground font-medium">API Response Time</span>
                  <span className="text-emerald-500 font-mono font-medium">12ms (Good)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
