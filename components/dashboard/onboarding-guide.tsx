"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Settings, Package, Share2, X, Copy, PartyPopper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { toast } from "sonner"

interface OnboardingGuideProps {
  hasTelegramBot: boolean
  hasProducts: boolean
  storeSlug: string
  locale: string
}

export function OnboardingGuide({ hasTelegramBot, hasProducts, storeSlug, locale }: OnboardingGuideProps) {
  const [isVisible, setIsVisible] = useState(true)

  const steps = [
    {
      id: "telegram",
      title: "Configure Notifications",
      description: "Link a Telegram Bot to get instant alerts for new orders.",
      icon: Settings,
      completed: hasTelegramBot,
      href: `/${locale}/dashboard/settings`,
      action: "Go to Settings",
    },
    {
      id: "product",
      title: "Add a Product",
      description: "Create your first product so customers can start buying.",
      icon: Package,
      completed: hasProducts,
      href: `/${locale}/dashboard/products`,
      action: "Add Product",
    },
    {
      id: "share",
      title: "Share Your Store",
      description: "Copy your store link and share it with your customers.",
      icon: Share2,
      completed: false,
      action: "Copy Link",
      href: null,
      onClick: () => {
        const url = `${window.location.origin}/${locale}/store/${storeSlug}`
        navigator.clipboard.writeText(url)
        toast.success("Store link copied to clipboard!")
      },
    },
  ]

  const completedCount = steps.filter((s) => s.id !== "share" && s.completed).length
  const totalCoreSteps = 2
  const progress = (completedCount / totalCoreSteps) * 100
  const allDone = completedCount >= totalCoreSteps

  // Only hide when user explicitly clicks X
  if (!isVisible) return null

  // Show congratulations banner when all core steps are done
  if (allDone) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 shadow-sm relative overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-green-700 dark:text-green-400">
            <PartyPopper className="h-5 w-5" />
            Your store is ready to go!
          </CardTitle>
          <CardDescription>
            You have completed all setup steps. Your store is fully configured and ready to take orders!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              const url = `${window.location.origin}/${locale}/store/${storeSlug}`
              navigator.clipboard.writeText(url)
              toast.success("Store link copied to clipboard!")
            }}
          >
            <Copy className="h-3 w-3 mr-2" />
            Copy Store Link
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Welcome to your Dashboard! 👋</CardTitle>
        <CardDescription>Complete these steps to get your store up and running.</CardDescription>

        <div className="mt-4 space-y-2 max-w-xl">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Setup Progress</span>
            <span className="text-muted-foreground">{completedCount} of {totalCoreSteps} steps completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.id}
                className={`relative flex flex-col gap-3 rounded-lg border p-4 transition-colors ${
                  step.completed ? "bg-muted/50 border-muted" : "bg-background border-border shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-md ${step.completed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {step.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/30" />
                  )}
                </div>

                <div className="flex-1">
                  <h5 className={`font-semibold text-sm ${step.completed ? "text-muted-foreground line-through" : ""}`}>
                    {step.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-auto">
                  {step.onClick ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-medium"
                      onClick={step.onClick}
                    >
                      <Copy className="h-3 w-3 mr-1.5" />
                      {step.action}
                    </Button>
                  ) : (
                    <Link href={step.href ?? "#"}>
                      <Button
                        variant={step.completed ? "outline" : "default"}
                        size="sm"
                        className="w-full text-xs font-medium"
                      >
                        {step.completed ? "✓ Done" : step.action}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
