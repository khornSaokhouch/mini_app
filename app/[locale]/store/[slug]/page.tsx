"use client"

import { useState } from "react"
import { Search, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"
import WebApp from "@twa-dev/sdk"

const mockProducts = [
  { id: "1", name: "Wireless Earbuds Pro", price: 89.99, image: "🎧", category: "Electronics" },
  { id: "2", name: "Smart Watch Series X", price: 199.99, image: "⌚", category: "Electronics" },
  { id: "3", name: "Bamboo Desk Organizer", price: 29.99, image: "📦", category: "Office" },
  { id: "4", name: "Leather Wallet Slim", price: 49.99, image: "👛", category: "Accessories" },
  { id: "5", name: "Coffee Mug Insulated", price: 24.99, image: "☕", category: "Kitchen" },
]

export default function StorefrontPage() {
  const [search, setSearch] = useState("")

  const filtered = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddToCart = (product: any) => {
    // Show haptic feedback using Telegram SDK
    if (typeof window !== "undefined" && WebApp.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred("light")
    }
    // Setup Telegram MainButton
    if (typeof window !== "undefined" && WebApp.MainButton) {
      WebApp.MainButton.text = "VIEW CART ($89.99)"
      WebApp.MainButton.show()
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-9 bg-muted/50 border-0 h-11 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "Electronics", "Office", "Accessories", "Kitchen"].map(c => (
          <button key={c} className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium whitespace-nowrap">
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {filtered.map(product => (
          <div key={product.id} className="flex flex-col bg-card rounded-2xl p-3 shadow-sm border">
            <div className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center text-4xl mb-3">
              {product.image}
            </div>
            <h3 className="font-medium text-sm leading-tight line-clamp-2">{product.name}</h3>
            <div className="mt-auto pt-3 flex items-center justify-between">
              <span className="font-bold">${product.price}</span>
              <button 
                onClick={() => handleAddToCart(product)}
                className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
