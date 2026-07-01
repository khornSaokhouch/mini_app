"use client"

import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

interface PricingSectionProps {
  locale: string
}

export function PricingSection({ locale }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Lite",
      description: "Perfect for getting started and trying out our platform.",
      price: { monthly: 9, yearly: 7 },
      features: [
        "1 active storefront",
        "Up to 50 products",
        "Basic Telegram Mini App Integration",
        "Standard checkout process",
        "Community support",
      ],
      cta: "Start Free Trial",
      href: `/${locale}/register`,
      popular: false,
    },
    {
      name: "Pro",
      description: "Everything you need to grow your store and scale your business.",
      price: { monthly: 29, yearly: 23 },
      features: [
        "Unlimited active storefronts",
        "Unlimited products",
        "Full Telegram Mini App SDK Access",
        "Custom domain integration",
        "Advanced dashboard & sales reports",
        "Priority email support (24/7)",
      ],
      cta: "Get Started Pro",
      href: `/${locale}/register`,
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Advanced controls, high volume sales support, and custom options.",
      price: { monthly: 99, yearly: 79 },
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom feature development",
        "High-performance API access",
        "99.9% Uptime SLA",
        "Custom webhooks & Web3 integrations",
      ],
      cta: "Start Enterprise Trial",
      href: `/${locale}/register`,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background border-t relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-fuchsia-500/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '7s' }} />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose the subscription plan that fits your business stage. No hidden fees.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold transition-colors ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              className="relative w-14 h-8 rounded-full p-1 border-violet-500/30 bg-background/50 hover:bg-background/80 shadow-inner"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              <span
                className={`absolute top-1 left-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                  billingCycle === "yearly" ? "translate-x-6" : ""
                }`}
              />
            </Button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="inline-block bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm shadow-emerald-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mt-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-between rounded-3xl bg-card/60 backdrop-blur-xl border p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular
                  ? "border-transparent shadow-[0_0_40px_rgba(139,92,246,0.15)] md:scale-105 z-10"
                  : "border-white/10 shadow-sm hover:border-white/20"
              }`}
            >
              {/* Vibrant Border for Popular Plan using pseudo element approach for glowing border */}
              {plan.popular && (
                <div className="absolute inset-[-1px] rounded-[1.5rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 -z-10 opacity-70"></div>
              )}
              {plan.popular && (
                <div className="absolute inset-0 rounded-3xl bg-card/90 backdrop-blur-xl -z-0"></div>
              )}

              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-violet-500/30 z-10">
                  Most Popular
                </span>
              )}

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold ${plan.popular ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500" : ""}`}>{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 min-h-[40px] leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-muted-foreground ml-2 text-sm font-semibold">
                    / month
                  </span>
                </div>

                <hr className={`my-6 ${plan.popular ? "border-violet-500/20" : "border-white/10"}`} />

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-sm shadow-violet-500/30" : "bg-muted text-muted-foreground"}`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-foreground leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10">
                <Link
                  href={plan.href}
                  className={buttonVariants({
                    size: "lg",
                    variant: plan.popular ? "default" : "outline",
                    className: `w-full rounded-full font-semibold transition-all h-12 shadow-sm border-0 ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-[1.02]"
                        : "bg-muted/50 hover:bg-muted/80 backdrop-blur-md"
                    }`,
                  })}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
