"use client"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

export function FaqSection() {
  const t = useTranslations("FaqSection")
  const faqs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer")
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer")
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer")
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer")
    }
  ]

  return (
    <section id="faq" className="py-20 md:py-32 bg-background border-t">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
          {t("title").split(" ").slice(0, -2).join(" ")} {t("title").split(" ").slice(-2, -1)} <span className="text-primary">{t("title").split(" ").slice(-1)}</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border/50 rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
