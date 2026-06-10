"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  PartyPopper, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface DashboardTourProps {
  locale: string
}

export function DashboardTour({ locale }: DashboardTourProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const router = useRouter()

  const steps = [
    {
      target: null, // Centered
      title: "Welcome to KhMarket! 👋",
      description: "We're excited to have you here. Let's take a quick 6-step tour to help you get started with your new store.",
      icon: PartyPopper,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      target: "tour-stats",
      title: "Dashboard Overview",
      description: "Monitor your total revenue, pending orders, and customer growth at a glance.",
      icon: LayoutDashboard,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      target: "tour-products",
      title: "Manage Products",
      description: "Add and organize your products here. Set prices, manage stock, and upload photos.",
      icon: Package,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      target: "tour-orders",
      title: "Track Your Orders",
      description: "Manage order statuses, process payments, and generate invoices seamlessly.",
      icon: ShoppingCart,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      target: "tour-customers",
      title: "Customer Relations",
      description: "Keep track of your loyal customers and view their purchase history.",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      target: "tour-settings",
      title: "Final Step: Settings",
      description: "Configure your store profile, payment methods, and connect your Telegram Bot.",
      icon: Settings,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ]

  const updateCoords = useCallback(() => {
    const targetId = steps[currentStep].target
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        const rect = el.getBoundingClientRect()
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        })
        
        // Scroll target into view if needed
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      setCoords({ top: 0, left: 0, width: 0, height: 0 })
    }
  }, [currentStep])

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenDashboardTour")
    if (!hasSeenTour) {
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      updateCoords()
      window.addEventListener('resize', updateCoords)
      return () => window.removeEventListener('resize', updateCoords)
    }
  }, [isOpen, updateCoords])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    localStorage.setItem("hasSeenDashboardTour", "true")
    setIsOpen(false)
    router.push(`/${locale}/dashboard/settings`)
  }

  if (!isOpen) return null

  const step = steps[currentStep]
  const Icon = step.icon
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Dimmed Overlay with Hole */}
      <div className="absolute inset-0 bg-black/60 pointer-events-auto transition-all duration-500" 
           style={{
             clipPath: step.target 
               ? `polygon(0% 0%, 0% 100%, ${coords.left - 8}px 100%, ${coords.left - 8}px ${coords.top - 8}px, ${coords.left + coords.width + 8}px ${coords.top - 8}px, ${coords.left + coords.width + 8}px ${coords.top + coords.height + 8}px, ${coords.left - 8}px ${coords.top + coords.height + 8}px, ${coords.left - 8}px 100%, 100% 100%, 100% 0%)`
               : 'none'
           }}
      />

      {/* Pulsing Circle Highlight */}
      {step.target && (
        <div 
          className="absolute border-4 border-primary rounded-xl transition-all duration-500 ease-in-out shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
          style={{
            top: coords.top - 12,
            left: coords.left - 12,
            width: coords.width + 24,
            height: coords.height + 24,
          }}
        >
          <div className="absolute inset-0 border-4 border-primary rounded-xl animate-ping opacity-50" />
        </div>
      )}

      {/* Tooltip Card */}
      <div 
        className={cn(
          "absolute pointer-events-auto w-full max-w-[400px] transition-all duration-500 ease-in-out",
          !step.target ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""
        )}
        style={step.target ? {
          top: coords.top + coords.height + 30,
          left: Math.min(Math.max(20, coords.left + (coords.width / 2) - 200), window.innerWidth - 420),
        } : {}}
      >
        <div className="bg-background rounded-3xl shadow-2xl border p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Progress background bar */}
          <div className="absolute top-0 left-0 h-1.5 bg-muted w-full">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex flex-col items-center text-center gap-6 mt-4">
            <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center`}>
              <Icon className={`w-8 h-8 ${step.color}`} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <Button 
              onClick={handleNext} 
              className="flex-1 rounded-full font-semibold shadow-lg shadow-primary/20"
            >
              {currentStep === steps.length - 1 ? "Go to Settings" : "Next Step"}
              {currentStep < steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Arrow pointing up (only if targeting) */}
        {step.target && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-bottom-[12px] border-b-background" />
        )}
      </div>
    </div>
  )
}
