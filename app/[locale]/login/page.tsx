"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Store, Eye, EyeOff, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)
    if (result?.error) {
      setError("Invalid email or password. Please try again.")
    } else {
      router.push(`/${locale}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 p-12 text-white relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] z-0" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="font-bold text-2xl tracking-tight">Online Shop Platform</span>
        </div>
        <div>
          <blockquote className="text-2xl font-semibold leading-relaxed mb-6">
            "The fastest way to launch your store and sell on Telegram — all in one place."
          </blockquote>
          <p className="text-primary-foreground/70 font-medium">Online Shop Platform</p>
        </div>
        <div className="flex gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1.5 w-8 rounded-full bg-white/30" />
          ))}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="font-bold text-xl tracking-tight">Online Shop Platform</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your store dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-violet-500 hover:text-violet-600 font-medium hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
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
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Signing in...</> : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href={`/${locale}/register`} className="font-semibold text-violet-500 hover:text-violet-600 hover:underline transition-colors">
              Create your store
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
