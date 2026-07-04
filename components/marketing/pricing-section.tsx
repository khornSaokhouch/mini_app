"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

interface PricingSectionProps {
  locale: string
}

export function PricingSection({ locale }: PricingSectionProps) {
  const t = useTranslations("PricingSection")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [fetchedPlans, setFetchedPlans] = useState<unknown[]>([])

  useEffect(() => {
    fetch("/api/plans")
      .then((r) => r.json())
      .then((d: unknown) => {
        if (Array.isArray(d)) setFetchedPlans(d)
      })
      .catch(() => {})
  }, [])

  const plans = fetchedPlans.map((p, i) => {
    const plan = p as { priceMonthly: number; priceYearly: number; features: string[]; isPopular: boolean }
    return {
      name: i === 0 ? t("storefrontName") : (i === 1 ? t("proName") : t("enterpriseName")),
      description: i === 0 ? t("storefrontDesc") : (i === 1 ? t("proDesc") : t("enterpriseDesc")),
      price: { monthly: plan.priceMonthly, yearly: plan.priceYearly },
      features: plan.features,
      cta: i === 0 ? t("storefrontCta") : (i === 1 ? t("proCta") : t("enterpriseCta")),
      href: `/${locale}/register`,
      popular: plan.isPopular,
    }
  })

  // plans array is now dynamic

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background border-t relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t("sectionTitle").split(" ").slice(0, -1).join(" ")} <span className="text-primary">{t("sectionTitle").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose the subscription plan that fits your business stage. No hidden fees.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold transition-colors ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              {t("monthly")}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="relative w-14 h-8 rounded-full p-1 border-primary/30 bg-background/50 hover:bg-background/80 shadow-inner"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            >
              <span
                className={`absolute top-1 left-1 bg-primary w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${
                  billingCycle === "yearly" ? "translate-x-6" : ""
                }`}
              />
            </Button>
            <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
              {t("yearly")}
              <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
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
                  ? "border-transparent shadow-xl shadow-primary/10 md:scale-105 z-10 w-full md:w-[calc(100%+2rem)]"
                  : "border-border/60 shadow-sm hover:border-border"
              }`}
            >
              {/* Border for Popular Plan */}
              {plan.popular && (
                <div className="absolute inset-[-1px] rounded-[1.5rem] bg-primary -z-10 opacity-70"></div>
              )}
              {plan.popular && (
                <div className="absolute inset-0 rounded-3xl bg-card -z-0"></div>
              )}

              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest z-10">
                  Most Popular
                </span>
              )}

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold ${plan.popular ? "text-primary" : ""}`}>{plan.name}</h3>
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

                <hr className={`my-6 ${plan.popular ? "border-primary/20" : "border-border/50"}`} />

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
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
