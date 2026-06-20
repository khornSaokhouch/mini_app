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
    <section id="pricing" className="py-20 md:py-32 bg-muted/20 border-t relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Simple, transparent pricing
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
              className="relative w-14 h-8 rounded-full p-1 border-primary/20 bg-background/50 hover:bg-background/80"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              <span
                className={`absolute top-1 left-1 bg-primary w-6 h-6 rounded-full transition-transform duration-300 ${
                  billingCycle === "yearly" ? "translate-x-6 bg-indigo-600" : ""
                }`}
              />
            </Button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
              <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
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
              className={`relative flex flex-col justify-between rounded-3xl bg-background border p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary md:scale-105 z-10"
                  : "border-border shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
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

                <hr className="border-border my-6" />

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={plan.href}
                  className={buttonVariants({
                    size: "lg",
                    variant: plan.popular ? "default" : "outline",
                    className: `w-full rounded-full font-semibold transition-all h-12 shadow-sm ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-primary/20 shadow-md"
                        : "hover:bg-muted"
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
