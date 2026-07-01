"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Store, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const features = [
  "Unlimited products & inventory tracking",
  "Telegram Mini App storefront out of the box",
  "Invoicing, payments & order management",
  "14-day free trial — no credit card required",
]

export default function RegisterPage() {
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  const router = useRouter()

  const [form, setForm] = useState({ name: "", email: "", storeName: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "STORE_OWNER" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Registration failed")
      router.push(`/${locale}/login?registered=1`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-12 text-white relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] z-0" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="font-bold text-2xl tracking-tight">Online Shop Platform</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8 leading-snug">Start selling smarter,<br />today.</h2>
          <ul className="space-y-4">
            {features.map(f => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-white/80" />
                <span className="text-primary-foreground/90">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-primary-foreground/50 text-sm">© 2026 Online Shop Platform.</p>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="font-bold text-xl tracking-tight">Online Shop Platform</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">Create your store</h1>
            <p className="text-muted-foreground mt-2">Free for 14 days. No credit card needed.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Sokha Prak" value={form.name} onChange={handleChange("name")} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange("email")} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" placeholder="My Awesome Store" value={form.storeName} onChange={handleChange("storeName")} required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                  required
                  minLength={8}
                  className="h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base shadow-md transition-all hover:scale-[1.02]" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating your store...</> : "Create Store & Sign Up"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>
              {" "}and{" "}
              <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={`/${locale}/login`} className="font-semibold text-violet-500 hover:text-violet-600 hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
