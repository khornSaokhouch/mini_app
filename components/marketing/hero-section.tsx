"use client"

import Link from "next/link"
import { ArrowRight, DollarSign, Package, Users, ShoppingCart } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  locale: string
}

interface PreviewData {
  stats: {
    totalOrders: number
    totalRevenue: number
    totalProducts: number
    totalCustomers: number
  }
  chartData: { month: string; total: number }[]
  products: { id: string; name: string; sellPrice: number; images: string[] }[]
}

export function HeroSection({ locale }: HeroSectionProps) {
  const [data, setData] = useState<PreviewData | null>(null)

  useEffect(() => {
    fetch("/api/hero-preview")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {}) // silent fail — CSS fallback stays visible
  }, [])

  const stats = data?.stats
  const chartData = data?.chartData ?? []
  const products = data?.products ?? []

  // Compute chart bar heights relative to max value
  const maxRevenue = Math.max(...chartData.map((c) => c.total), 1)

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />

      <div className="container mx-auto px-6 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-semibold bg-primary/5 text-primary mb-6 md:mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            Telegram Mini App SDK now supported
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Your store, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">everywhere.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            The all-in-one platform to manage inventory, process payments, and sell beautifully on the Web and directly inside Telegram.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href={`/${locale}/register`} className={buttonVariants({ size: "lg", className: "gap-2 text-md h-14 px-8 rounded-full w-full sm:w-auto shadow-lg shadow-primary/20" })}>
              Create Your Store <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#demo" className={buttonVariants({ size: "lg", variant: "outline", className: "text-md h-14 px-8 rounded-full w-full sm:w-auto" })}>
              Book Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground font-medium">No credit card required • 14-day free trial</p>
        </div>

        {/* Device Mockups */}
        <div className="w-full lg:w-1/2 lg:flex-1 relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[600px] min-h-[450px] sm:min-h-[500px] md:min-h-[600px] shrink-0 flex justify-center lg:justify-end mt-12 lg:mt-0">

          {/* ── Desktop Dashboard Frame ── */}
          <div className="absolute right-0 top-0 w-[120%] lg:w-[140%] max-w-[800px] rounded-xl overflow-hidden border border-border shadow-2xl bg-card flex flex-col z-10 transform rotate-[-2deg] scale-75 sm:scale-90 md:scale-100 origin-top hover:rotate-0 transition-transform duration-700">
            {/* Browser chrome */}
            <div className="h-8 bg-muted flex items-center px-4 gap-2 border-b shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto bg-background/50 rounded-md h-5 w-64 text-[10px] flex items-center justify-center text-muted-foreground font-mono">
                dashboard.khmarket.com
              </div>
            </div>

            {/* Dashboard content */}
            <div className="flex flex-1 h-[400px] overflow-hidden">
              {/* Sidebar */}
              <div className="w-44 bg-card border-r p-3 space-y-1.5 shrink-0">
                <div className="h-3 bg-muted rounded w-2/3 mb-3" />
                {["Dashboard", "Orders", "Products", "Customers"].map((item, i) => (
                  <div key={item} className={`h-7 rounded-lg flex items-center px-2 text-[9px] font-semibold ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-3 space-y-3 overflow-hidden bg-muted/10">
                {/* Stat cards */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Revenue", value: stats ? `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "–", icon: DollarSign },
                    { label: "Orders", value: stats?.totalOrders ?? "–", icon: ShoppingCart },
                    { label: "Products", value: stats?.totalProducts ?? "–", icon: Package },
                    { label: "Customers", value: stats?.totalCustomers ?? "–", icon: Users },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-card rounded-lg border p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] text-muted-foreground font-medium">{label}</span>
                        <Icon className="h-2.5 w-2.5 text-muted-foreground" />
                      </div>
                      <div className="text-xs font-bold transition-all duration-500">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Revenue chart */}
                <div className="bg-card rounded-lg border p-3 h-[270px] flex flex-col">
                  <div className="text-[9px] font-semibold text-muted-foreground mb-2">Monthly Revenue</div>
                  <div className="flex-1 flex items-end gap-1.5 pb-1">
                    {chartData.length > 0
                      ? chartData.map((c, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-t transition-all duration-700 bg-primary"
                              style={{ height: `${Math.max(8, (c.total / maxRevenue) * 100)}%`, opacity: 0.4 + (i / chartData.length) * 0.6 }}
                            />
                            <span className="text-[7px] text-muted-foreground">{c.month}</span>
                          </div>
                        ))
                      : /* Fallback skeleton bars */
                        [40, 70, 50, 90, 60, 80].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full rounded-t bg-primary/40 animate-pulse" style={{ height: `${h}%` }} />
                            <div className="h-1.5 w-4 bg-muted rounded animate-pulse" />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile / Telegram Frame ── */}
          <div className="absolute right-0 sm:right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-[-40px] top-10 md:top-32 lg:top-40 w-[260px] sm:w-[280px] h-[520px] sm:h-[580px] rounded-[3rem] border-[8px] border-slate-900 bg-background shadow-2xl overflow-hidden z-20 flex flex-col transform rotate-2 scale-75 sm:scale-90 md:scale-100 origin-top hover:rotate-0 transition-transform duration-700">
            {/* Notch */}
            <div className="absolute top-0 w-full h-7 flex justify-center z-10 pointer-events-none">
              <div className="w-1/3 h-full bg-slate-900 rounded-b-xl" />
            </div>

            {/* Telegram top bar */}
            <div className="h-14 bg-blue-500 flex items-end px-4 pb-2.5 shrink-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 border-l-2 border-t-2 border-white rotate-[-45deg] ml-0.5" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[10px] leading-none">My Store</p>
                    <p className="text-blue-200 text-[8px] mt-0.5">Mini App</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                  <div className="w-5 h-5 rounded-full bg-white/20" />
                </div>
              </div>
            </div>

            {/* Store banner */}
            <div className="h-16 bg-gradient-to-r from-primary/80 to-indigo-500/80 flex items-center px-3 gap-2 shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/30 shrink-0" />
              <div>
                <p className="text-white text-[9px] font-bold">KhMarket Store</p>
                <p className="text-white/70 text-[7px]">Free shipping on orders $20+</p>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex gap-1.5 px-2.5 py-2 shrink-0 overflow-x-hidden">
              {["All", "New", "Popular", "Sale"].map((cat, i) => (
                <div
                  key={cat}
                  className={`px-2.5 py-1 rounded-full text-[8px] font-bold shrink-0 ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>

            {/* Product grid */}
            <div className="flex-1 overflow-hidden px-2.5 pb-1">
              <div className="grid grid-cols-2 gap-2">
                {products.length > 0
                  ? products.slice(0, 4).map((p) => (
                      <div key={p.id} className="bg-card border border-border rounded-xl flex flex-col overflow-hidden shadow-sm">
                        {p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full aspect-square object-cover"
                          />
                        ) : (
                          <div className="w-full aspect-square bg-muted flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground/40" />
                          </div>
                        )}
                        <div className="p-1.5 flex flex-col gap-0.5">
                          <p className="text-[8px] font-semibold leading-tight line-clamp-1 text-foreground">{p.name}</p>
                          <p className="text-[9px] text-primary font-bold">${p.sellPrice}</p>
                          <div className="w-full mt-0.5 h-4 rounded-md bg-primary/10 flex items-center justify-center">
                            <span className="text-[6px] font-bold text-primary">+ ADD</span>
                          </div>
                        </div>
                      </div>
                    ))
                  : /* Skeleton fallback */
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-card border border-border rounded-xl flex flex-col overflow-hidden animate-pulse">
                        <div className="w-full aspect-square bg-muted" />
                        <div className="p-1.5 space-y-1">
                          <div className="h-2 bg-muted rounded w-4/5" />
                          <div className="h-2 bg-primary/20 rounded w-1/2" />
                          <div className="h-4 bg-muted rounded-md w-full mt-0.5" />
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Bottom cart bar */}
            <div className="shrink-0 border-t bg-card px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1.5">
                <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-[7px] text-muted-foreground">Cart</p>
                  <p className="text-[8px] font-bold text-foreground">
                    {products.length > 0 ? `${products.length} items` : "Empty"}
                  </p>
                </div>
              </div>
              <div className="h-7 px-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary-foreground">Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
