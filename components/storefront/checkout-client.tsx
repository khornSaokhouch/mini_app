"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/lib/store"
import WebApp from "@twa-dev/sdk"
import { ChevronLeft, MapPin, Phone, User, CreditCard, Banknote, CheckCircle2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createStorefrontOrder } from "@/lib/actions"

export function CheckoutClient({ store }: { store: any }) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BAKONG" | "ABA">("COD")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Only allow Bakong/ABA if the store has configured the links
  const hasBakong = !!store.bakongLink
  const hasAba = !!store.abaMerchantLink

  useEffect(() => {
    // If cart is empty and we haven't just succeeded, redirect back
    if (items.length === 0 && !isSuccess) {
      router.push(`/${locale}/store/${store.slug}`)
      return
    }

    if (typeof window !== "undefined" && WebApp.MainButton) {
      if (!isSuccess) {
        WebApp.MainButton.text = `CONFIRM ORDER • ${store.currency === 'USD' ? '$' : ''}${total.toFixed(2)}`
        
        // Show button only if required fields are filled
        if (name.trim() && phone.trim() && address.trim() && !isSubmitting) {
          WebApp.MainButton.show()
        } else {
          WebApp.MainButton.hide()
        }
        
        const handleConfirm = async () => {
          setIsSubmitting(true)
          WebApp.MainButton.showProgress()

          const res = await createStorefrontOrder({
            storeId: store.id,
            customer: { name, phone, address },
            items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })),
            paymentMethod,
            totalAmount: total
          })

          WebApp.MainButton.hideProgress()
          
          if (res.success) {
            clearCart()
            setIsSuccess(true)
            
            // If Bakong or ABA was selected, redirect to the payment link
            if (paymentMethod === "BAKONG" && store.bakongLink) {
              WebApp.openLink(store.bakongLink)
            } else if (paymentMethod === "ABA" && store.abaMerchantLink) {
              WebApp.openLink(store.abaMerchantLink)
            }
          } else {
            setIsSubmitting(false)
            WebApp.showAlert("Failed to place order. Please try again.")
          }
        }
        
        WebApp.MainButton.onClick(handleConfirm)
        return () => {
          WebApp.MainButton.offClick(handleConfirm)
        }
      } else {
        // Success state
        WebApp.MainButton.text = "BACK TO STORE"
        WebApp.MainButton.show()
        const handleBack = () => router.push(`/${locale}/store/${store.slug}`)
        WebApp.MainButton.onClick(handleBack)
        return () => {
          WebApp.MainButton.offClick(handleBack)
        }
      }
    }
  }, [items, store, locale, router, total, name, phone, address, paymentMethod, isSubmitting, isSuccess])

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background">
        <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for your order. We will process it shortly.
        </p>
        {paymentMethod !== "COD" && (
          <p className="text-sm text-muted-foreground bg-muted p-4 rounded-xl">
            If you haven't completed the payment yet, please check your chosen payment app.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/20 pb-24">
      <div className="p-4 flex items-center gap-3 bg-background border-b sticky top-0 z-10">
        <button 
          onClick={() => router.back()}
          className="h-10 w-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* Contact Info */}
        <section className="bg-background rounded-3xl p-5 shadow-sm border space-y-4">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
            <User className="h-5 w-5 text-primary" /> Contact Details
          </h2>
          
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input 
              placeholder="e.g. Sokha" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="rounded-xl h-12 bg-muted/50 border-0"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input 
              type="tel"
              placeholder="e.g. 012 345 678" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              className="rounded-xl h-12 bg-muted/50 border-0"
            />
          </div>
        </section>

        {/* Delivery Info */}
        <section className="bg-background rounded-3xl p-5 shadow-sm border space-y-4">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-primary" /> Delivery Address
          </h2>
          
          <div className="space-y-2">
            <Label>Full Address or Delivery Notes *</Label>
            <textarea 
              placeholder="House 123, St 456, Phnom Penh..." 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              className="flex min-h-[80px] w-full rounded-xl bg-muted/50 border-0 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-background rounded-3xl p-5 shadow-sm border space-y-4">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-primary" /> Payment Method
          </h2>
          
          <div className="flex flex-col gap-3">
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
              <input 
                type="radio" 
                name="payment" 
                value="COD" 
                checked={paymentMethod === 'COD'} 
                onChange={() => setPaymentMethod('COD')}
                className="w-5 h-5 accent-primary"
              />
              <div className="flex-1 flex items-center gap-3">
                <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                  <Banknote className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold">Cash on Delivery</div>
                  <div className="text-xs text-muted-foreground">Pay when you receive</div>
                </div>
              </div>
            </label>

            {hasBakong && (
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'BAKONG' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="BAKONG" 
                  checked={paymentMethod === 'BAKONG'} 
                  onChange={() => setPaymentMethod('BAKONG')}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1 flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-600 font-bold text-xs border border-red-500/20">
                    KHQR
                  </div>
                  <div>
                    <div className="font-bold">Bakong KHQR</div>
                    <div className="text-xs text-muted-foreground">Scan and pay with Bakong</div>
                  </div>
                </div>
              </label>
            )}

            {hasAba && (
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${paymentMethod === 'ABA' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="ABA" 
                  checked={paymentMethod === 'ABA'} 
                  onChange={() => setPaymentMethod('ABA')}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1 flex items-center gap-3">
                  <div className="h-10 w-10 bg-[#005288] rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                    ABA
                  </div>
                  <div>
                    <div className="font-bold">ABA PayWay</div>
                    <div className="text-xs text-muted-foreground">Pay directly with ABA App</div>
                  </div>
                </div>
              </label>
            )}
          </div>
        </section>

        {/* Total Summary */}
        <div className="bg-primary/10 rounded-3xl p-5 text-center mt-4 border border-primary/20">
          <p className="text-muted-foreground text-sm font-medium mb-1">Total Amount to Pay</p>
          <div className="text-3xl font-bold text-primary">${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
