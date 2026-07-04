"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const t = useTranslations("ForgotPassword")
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Use Promise.withResolvers as per project rules
    const { promise, resolve } = Promise.withResolvers<void>()
    
    // Simulate API call
    setTimeout(() => {
      resolve()
    }, 1500)

    await promise
    setLoading(false)
    setMessage("If an account with that email exists, we've sent reset instructions.")
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Branding Panel (Same as Login) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-zinc-950 p-12 text-white relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          <span className="font-bold text-2xl tracking-tight">Online Shop Platform</span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 relative">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 lg:hidden"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back")}
        </Button>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
          </div>

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <Button type="submit" className="w-full h-11 text-base shadow-md transition-all hover:scale-[1.02]" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("loading")}</> : t("submit")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link href={`/${locale}/login`} className="font-semibold text-primary hover:underline transition-colors">
              {t("backToLogin")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
