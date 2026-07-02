"use client"

import { Button } from "@/components/ui/button"

export function FaqSection() {
  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from your dashboard settings. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all new accounts get a 14-day free trial with full access to Pro features. No credit card required."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We support major credit cards, as well as local payment methods like ABA PayWay and Bakong."
    },
    {
      question: "Do you provide support?",
      answer: "Yes, we provide email support for all plans, with priority support for Pro and Enterprise users."
    }
  ]

  return (
    <section id="faq" className="py-20 md:py-32 bg-background border-t">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Questions</span>
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
