"use client"

import { useEffect } from "react"
import { useCartStore } from "@/lib/store"
import WebApp from "@twa-dev/sdk"
import { ShoppingBag, ChevronLeft, Plus, Minus, Trash2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export function CartClient({ store }: { store: any }) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  
  const { items, updateQuantity, removeFromCart, getTotal } = useCartStore()
  const total = getTotal()

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp.MainButton) {
      if (total > 0) {
        WebApp.MainButton.text = `PROCEED TO CHECKOUT • ${store.currency === 'USD' ? '$' : ''}${total.toFixed(2)}`
        WebApp.MainButton.show()
        
        const handleCheckout = () => {
          router.push(`/${locale}/store/${store.slug}/checkout`)
        }
        
        WebApp.MainButton.onClick(handleCheckout)
        return () => {
          WebApp.MainButton.offClick(handleCheckout)
        }
      } else {
        WebApp.MainButton.hide()
      }
    }
  }, [items, store, locale, router, total])

  return (
    <div className="flex flex-col min-h-full bg-muted/20">
      <div className="p-4 flex items-center gap-3 bg-background border-b sticky top-0 z-10">
        <button 
          onClick={() => router.back()}
          className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Your Cart</h1>
      </div>

      <div className="p-4 flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground h-full">
            <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Cart is empty</h2>
            <p className="mb-8">Looks like you haven't added anything yet.</p>
            <Link 
              href={`/${locale}/store/${store.slug}`}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-background rounded-2xl border shadow-sm items-center">
                <div className="h-20 w-20 bg-muted rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <ShoppingBag className="h-8 w-8 text-muted-foreground/30" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">{item.name}</h3>
                  <div className="font-bold text-primary mb-2">${item.price.toFixed(2)}</div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-muted rounded-full px-1 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 rounded-full bg-background flex items-center justify-center shadow-sm"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded-full bg-background flex items-center justify-center shadow-sm"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="h-9 w-9 text-destructive/70 hover:text-destructive flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 bg-background rounded-2xl border p-4 shadow-sm mb-20">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
