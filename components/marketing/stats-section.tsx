"use client"

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
  const [data, setData] = useState<StatsData | null>(null)

  useEffect(() => {
    fetch("/api/hero-preview")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
  }, [])

  if (!data) return <section className="py-12 bg-background" />

  const { totalProducts, totalCustomers, totalStores } = data.stats

  const stats = [
    { label: "Total Users", value: totalCustomers.toLocaleString(), icon: Users, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
    { label: "Total Stores", value: totalStores.toLocaleString(), icon: Store, color: "from-violet-500 to-fuchsia-500", shadow: "shadow-violet-500/20" },
    { label: "Total Products", value: totalProducts.toLocaleString(), icon: Package, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
  ]

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border hover:border-violet-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
              
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${stat.shadow}`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl font-extrabold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">{stat.value}</div>
              <div className="text-lg text-muted-foreground font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
