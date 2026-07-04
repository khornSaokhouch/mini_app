"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Save, Lock, User, ShieldCheck, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { updateUser, updatePassword } from "@/lib/actions"
export function AdminSettingsClient({ initialUser }: { initialUser: { id: string; name: string | null; email: string | null } }) {
  const t = useTranslations("AdminPages.settings")
  
  const [fullName, setFullName] = useState(initialUser.name || "")
  const [email, setEmail] = useState(initialUser.email || "")

  // State for Security
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  // State for System/Others
  const [platformName, setPlatformName] = useState("KhMarket")
  const [supportEmail, setSupportEmail] = useState("support@khmarket.com")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [bakongEnabled, setBakongEnabled] = useState(true)
  const [bakongMerchantId, setBakongMerchantId] = useState("mkt_bakong_9921")
  const [abaEnabled, setAbaEnabled] = useState(false)
  const [abaMerchantId, setAbaMerchantId] = useState("")

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateUser({ name: fullName, email: email })
      toast.success("Account updated")
      // Also need to save other settings here in a real app, 
      // but for now I will only focus on account as requested.
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleResetPassword = async () => {
    setSaving(true)
    try {
      await updatePassword({ currentPassword, newPassword })
      toast.success("Password updated")
      setCurrentPassword("")
      setNewPassword("")
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("description")}</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted border border-border/40 p-1">
          <TabsTrigger value="general">{t("general")}</TabsTrigger>
          <TabsTrigger value="account">{t("account")}</TabsTrigger>
          <TabsTrigger value="security">{t("security")}</TabsTrigger>
          <TabsTrigger value="domain">{t("domain")}</TabsTrigger>
          <TabsTrigger value="gateways">{t("gateways")}</TabsTrigger>
          <TabsTrigger value="system">{t("system")}</TabsTrigger>
        </TabsList>


        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Details</CardTitle>
              <CardDescription>General settings for your platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input value={platformName} onChange={e => setPlatformName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input value={supportEmail} onChange={e => setSupportEmail(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("account")}</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("security")}</CardTitle>
              <CardDescription>Update your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleResetPassword} disabled={saving} className="gap-2">
                  <Lock className="h-4 w-4" />
                  {saving ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("domain")}</CardTitle>
              <CardDescription>Configure your platform domain.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label>Custom Domain</Label>
                <Input placeholder="example.com" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
              <CardDescription>Configure your payment integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bakong</Label>
                  <p className="text-sm text-muted-foreground">Enable Bakong payments</p>
                </div>
                <Switch checked={bakongEnabled} onCheckedChange={setBakongEnabled} />
              </div>
              {bakongEnabled && (
                <div className="space-y-2">
                  <Label>Bakong Merchant ID</Label>
                  <Input value={bakongMerchantId} onChange={e => setBakongMerchantId(e.target.value)} />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ABA PayWay</Label>
                  <p className="text-sm text-muted-foreground">Enable ABA PayWay payments</p>
                </div>
                <Switch checked={abaEnabled} onCheckedChange={setAbaEnabled} />
              </div>
              {abaEnabled && (
                <div className="space-y-2">
                  <Label>ABA Merchant ID</Label>
                  <Input value={abaMerchantId} onChange={e => setAbaMerchantId(e.target.value)} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Advanced platform control settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Prevent user access for maintenance</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
