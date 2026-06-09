"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingBag, X, ChevronRight, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/store"
import WebApp from "@twa-dev/sdk"

export function StorefrontClient({ 
  store, 
  categories, 
  products 
}: { 
  store: any
  categories: any[]
  products: any[]
}) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  
  const { items, addToCart, getTotal, getItemCount } = useCartStore()

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
        WebApp.MainButton.text = `CHECKOUT • ${store.currency === 'USD' ? '$' : ''}${total.toFixed(2)}`
        WebApp.MainButton.show()
        
        // When clicked, we would normally go to a checkout page or trigger payment
        const handleCheckout = () => {
          // Open Bakong/ABA link or a checkout modal
          if (store.bakongLink) {
            WebApp.openLink(store.bakongLink)
          } else if (store.abaMerchantLink) {
            WebApp.openLink(store.abaMerchantLink)
          } else {
            WebApp.showAlert("Checkout processing coming soon!")
          }
        }
        
        WebApp.MainButton.onClick(handleCheckout)
        return () => {
          WebApp.MainButton.offClick(handleCheckout)
        }
      } else {
        WebApp.MainButton.hide()
      }
    }
  }, [items, store])

  const handleAddToCart = (product: any) => {
    if (typeof window !== "undefined" && WebApp.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred("light")
    }
    addToCart(product, 1)
    setSelectedProduct(null) // Close sheet if open
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
            <div key={product.id} className="flex flex-col bg-card rounded-3xl p-3 shadow-sm border border-border/50 relative overflow-hidden group">
              <div 
                className="aspect-square bg-muted/30 rounded-2xl flex items-center justify-center text-4xl mb-3 cursor-pointer overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
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
                  onClick={() => handleAddToCart(product)}
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

      {/* Product Details Sheet */}
      <Sheet open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <SheetContent side="bottom" className="rounded-t-[2rem] p-0 border-0 h-[85vh] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="w-full aspect-square bg-muted relative">
              {selectedProduct?.images?.[0] ? (
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted/50">
                  <ShoppingBag className="h-20 w-20 text-muted-foreground/30" />
                </div>
              )}
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-md border-0 h-10 w-10"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 pb-24">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold">{selectedProduct?.name}</h2>
                <div className="text-2xl font-bold text-primary whitespace-nowrap">
                  ${selectedProduct?.sellPrice?.toFixed(2)}
                </div>
              </div>
              
              {selectedProduct?.description && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wider">Description</h4>
                  <p className="text-foreground/80 leading-relaxed text-sm">
                    {selectedProduct.description}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t z-10">
            <Button 
              size="lg" 
              className="w-full rounded-full h-14 text-base font-bold shadow-xl shadow-primary/20"
              onClick={() => handleAddToCart(selectedProduct)}
            >
              Add to Cart • ${selectedProduct?.sellPrice?.toFixed(2)}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
