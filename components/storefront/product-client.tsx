"use client"

import { useEffect } from "react"
import { useCartStore } from "@/lib/store"
import WebApp from "@twa-dev/sdk"
import { ShoppingBag, ChevronLeft } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

export function ProductClient({ product, store }: { product: any, store: any }) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  
  const { addToCart, items } = useCartStore()
  const inCart = items.find(i => i.id === product.id)

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp.MainButton) {
      WebApp.MainButton.text = `ADD TO CART • ${store.currency === 'USD' ? '$' : ''}${product.sellPrice.toFixed(2)}`
      WebApp.MainButton.show()
      
      const handleAdd = () => {
        if (typeof window !== "undefined" && WebApp.HapticFeedback) {
          WebApp.HapticFeedback.impactOccurred("light")
        }
        addToCart(product, 1)
        WebApp.showAlert("Added to cart!")
        router.back()
      }
      
      WebApp.MainButton.onClick(handleAdd)
      return () => {
        WebApp.MainButton.offClick(handleAdd)
        WebApp.MainButton.hide()
      }
    }
  }, [product, store, addToCart, router])

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Back Button Overlay */}
      <button 
        onClick={() => router.back()}
        className="absolute top-20 left-4 z-10 h-10 w-10 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Product Image */}
      <div className="w-full aspect-square bg-muted relative">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <ShoppingBag className="h-20 w-20 text-muted-foreground/30" />
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-6 pb-24 flex-1 bg-background rounded-t-[2rem] -mt-8 relative z-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgb(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
          <div className="text-2xl font-bold text-primary whitespace-nowrap">
            ${product.sellPrice.toFixed(2)}
          </div>
        </div>
        
        {inCart && (
          <div className="inline-flex items-center rounded-full border border-green-500/20 px-3 py-1 text-xs font-semibold bg-green-500/10 text-green-600 mb-6">
            ✓ {inCart.quantity} in your cart
          </div>
        )}

        <div className="mb-6">
          <h4 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Description</h4>
          {product.description ? (
            <p className="text-foreground/80 leading-relaxed text-base whitespace-pre-wrap">
              {product.description}
            </p>
          ) : (
            <p className="text-muted-foreground italic">No description available.</p>
          )}
        </div>
        
        {/* Placeholder for variants in the future */}
      </div>
    </div>
  )
}
