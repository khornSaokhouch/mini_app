"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Store, 
  CreditCard, 
  User, 
  Lock, 
  Bell, 
  Smartphone,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function SettingsTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 })

  const steps = [
    {
      target: "tour-content-store",
      tab: "tour-tab-store",
      title: "Store Information",
      description: "Update your store name, currency, and language here. This is how your store will appear to customers.",
      icon: Store,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      target: "tour-content-payment",
      tab: "tour-tab-payment",
      title: "Payment Methods",
      description: "Connect your Bakong or ABA PayWay links. This allows you to receive payments directly from your customers.",
      icon: CreditCard,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      target: "tour-content-account",
      tab: "tour-tab-account",
      title: "Account Profile",
      description: "Manage your personal information, email address, and contact details for administrative purposes.",
      icon: User,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      target: "tour-content-security",
      tab: "tour-tab-security",
      title: "Security & Password",
      description: "Keep your account safe by updating your password regularly and monitoring security settings.",
      icon: Lock,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      target: "tour-content-notifications",
      tab: "tour-tab-notifications",
      title: "Notification Center",
      description: "Choose exactly what you want to be notified about—new orders, low stock, or payment confirmations.",
      icon: Bell,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      target: "tour-content-telegram",
      tab: "tour-tab-telegram",
      title: "Telegram Integration",
      description: "The most important step! Connect your Bot Token here to enable your Telegram Mini App storefront.",
      icon: Smartphone,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ]

  const updateCoords = useCallback(() => {
    const step = steps[currentStep]
    
    // Auto-click the tab first to make content visible
    const tabEl = document.getElementById(step.tab)
    if (tabEl) {
      tabEl.click()
    }

    // Wait a brief moment for the tab content to render/transition
    setTimeout(() => {
      const el = document.getElementById(step.target)
      if (el) {
        const rect = el.getBoundingClientRect()
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        })
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 50)
  }, [currentStep])

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenSettingsTour")
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
    localStorage.setItem("hasSeenSettingsTour", "true")
    setIsOpen(false)
  }

  if (!isOpen) return null

  const step = steps[currentStep]
  const Icon = step.icon
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div
        className="absolute pointer-events-auto transition-all duration-500"
        style={{
          top: coords.top - 8,
          left: coords.left - 8,
          width: coords.width + 16,
          height: coords.height + 16,
          borderRadius: '12px',
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
        }}
      />

      <div 
        className="fixed pointer-events-auto w-full max-w-[300px] bottom-4 right-4 transition-all duration-500 ease-in-out"
      >
        <div className="bg-background rounded-xl shadow-lg border overflow-hidden">
          {/* Slim progress bar */}
          <div className="h-0.5 bg-muted w-full">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-md ${step.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${step.color}`} />
                </div>
                <h3 className="text-sm font-semibold leading-tight">{step.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full shrink-0 -mt-0.5 -mr-1"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground mr-auto">
                {currentStep + 1} / {steps.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="h-7 px-2 text-xs rounded-full"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                onClick={handleNext}
                size="sm"
                className="h-7 px-4 text-xs rounded-full font-medium"
              >
                {currentStep === steps.length - 1 ? "Done" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
