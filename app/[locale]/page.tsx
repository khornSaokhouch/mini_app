"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { MarketingHeader } from "@/components/marketing/marketing-header"
import { HeroSection } from "@/components/marketing/hero-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { SocialProofSection } from "@/components/marketing/social-proof-section"
import { MarketingFooter } from "@/components/marketing/marketing-footer"

export default function MarketingPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations('Index')
  const params = useParams()
  const locale = (params?.locale as string) || "en"

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Navbar */}
      <MarketingHeader locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection locale={locale} />

        {/* Features Section */}
        <FeaturesSection />

        {/* How it Works Section */}
        <HowItWorksSection />

        {/* Pricing Section (New) */}
        <PricingSection locale={locale} />

        {/* Social Proof Section */}
        <SocialProofSection />
      </main>

      {/* Footer */}
      <MarketingFooter />
    </div>
  )
}
