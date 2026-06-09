"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingBag, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/store"
import WebApp from "@twa-dev/sdk"
import { useRouter, useParams } from "next/navigation"

export function StorefrontClient({ 
  store, 
  categories, 
  products 
}: { 
  store: any
  categories: any[]
  products: any[]
}) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  
  const { items, addToCart, getTotal } = useCartStore()

  // Filter products
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === "All" || p.categoryId === activeCategory
    return matchesSearch && matchesCategory
  })

  // Update Telegram MainButton whenever cart changes
  useEffect(() => {
    if (typeof window !== "undefined" && WebApp.MainButton) {
      const total = getTotal()
      if (total > 0) {
        WebApp.MainButton.text = `VIEW CART • ${store.currency === 'USD' ? '$' : ''}${total.toFixed(2)}`
        WebApp.MainButton.show()
        
        const handleViewCart = () => {
          router.push(`/${locale}/store/${store.slug}/cart`)
        }
        
        WebApp.MainButton.onClick(handleViewCart)
        return () => {
          WebApp.MainButton.offClick(handleViewCart)
        }
      } else {
        WebApp.MainButton.hide()
      }
    }
  }, [items, store, locale, router])

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation() // Prevent navigating to product details
    if (typeof window !== "undefined" && WebApp.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred("light")
    }
    addToCart(product, 1)
  }

  const goToProduct = (productId: string) => {
    router.push(`/${locale}/store/${store.slug}/product/${productId}`)
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-9 bg-muted/50 border-0 h-12 rounded-2xl shadow-sm focus-visible:ring-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        <button 
          onClick={() => setActiveCategory("All")}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === "All" ? "bg-primary text-primary-foreground shadow-md" : "bg-muted/50 text-foreground hover:bg-muted"}`}
        >
          All
        </button>
        {categories.map(c => (
          <button 
            key={c.id} 
            onClick={() => setActiveCategory(c.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === c.id ? "bg-primary text-primary-foreground shadow-md" : "bg-muted/50 text-foreground hover:bg-muted"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {filtered.map(product => {
          const inCart = items.find(i => i.id === product.id)
          
          return (
            <div 
              key={product.id} 
              onClick={() => goToProduct(product.id)}
              className="flex flex-col bg-card rounded-3xl p-3 shadow-sm border border-border/50 relative overflow-hidden group cursor-pointer"
            >
              <div className="aspect-square bg-muted/30 rounded-2xl flex items-center justify-center text-4xl mb-3 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/30" />
                )}
              </div>
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 px-1">{product.name}</h3>
              <div className="mt-auto pt-3 flex items-center justify-between px-1">
                <span className="font-bold text-primary">${product.sellPrice.toFixed(2)}</span>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${inCart ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:scale-105 shadow-md shadow-primary/20'}`}
                >
                  {inCart ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No products found.
        </div>
      )}
    </div>
  )
}
