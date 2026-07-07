"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { Users, Store, Package } from "lucide-react"

interface StatsData {
  stats: {
    totalProducts: number
    totalCustomers: number
    totalStores: number
  }
}

export function StatsSection() {
  const t = useTranslations("StatsSection")
  const [data, setData] = useState<StatsData | null>(null)

  useEffect(() => {
    fetch("/api/hero-preview")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
  }, [])

  if (!data || !data.stats) return <section className="py-12 bg-background" />

  const { totalProducts, totalCustomers, totalStores } = data.stats

  const stats = [
    { label: t("totalUsers"), value: totalCustomers.toLocaleString(), icon: Users },
    { label: t("totalStores"), value: totalStores.toLocaleString(), icon: Store },
    { label: t("totalProducts"), value: totalProducts.toLocaleString(), icon: Package },
  ]

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/10">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-extrabold text-foreground mb-2">{stat.value}</div>
              <div className="text-lg text-muted-foreground font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
