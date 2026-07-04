"use client"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const BrandIcon = ({ d, name, color }: { d: string; name: string; color: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={`h-6 w-6 ${color} transition-colors`}>
    <path d={d} />
  </svg>
)

export function ContactSection() {
  const t = useTranslations("ContactSection")
  return (
    <section id="contact" className="py-20 md:py-32 bg-background border-t">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("title").split(" ").slice(0, -1).join(" ")} <span className="text-primary">{t("title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-12 rounded-3xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" placeholder={t("name")} className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" placeholder={t("email")} className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">{t("subject")}</Label>
                <Input id="subject" placeholder={t("subject")} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t("message")}</Label>
              <Textarea id="message" placeholder={t("message")} className="min-h-[150px]" />
            </div>
            <Button size="lg" className="w-full rounded-full px-8 shadow-lg transition-all hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground">
              {t("send")}
            </Button>
          </form>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold">{t("connect")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Facebook", href: "#", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "text-[#1877F2]", hoverColor: "group-hover:text-[#1877F2]" },
                { name: "TikTok", href: "#", d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89 2.77 2.77 0 0 1 1.33.34V9.36a6.04 6.04 0 0 0-1.33-.14 6.34 6.34 0 1 0 6.34 6.34V6.69z", color: "text-black dark:text-white", hoverColor: "group-hover:text-black dark:group-hover:text-white" },
                { name: "Telegram", href: "#", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.24-1.51-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2s-.14-.09-.23-.06c-.1.02-1.66 1.05-4.68 3.08-.44.3-.84.45-1.2.44-.39-.01-1.14-.22-1.7-.4-.73-.24-1.31-.37-1.26-.78.03-.23.36-.47 1.01-.72 3.96-1.73 6.6-2.87 7.91-3.43 3.76-1.59 4.54-1.87 5.05-1.88.11 0 .37.02.54.16.14.12.18.28.2.45-.01.07-.01.17-.03.25z", color: "text-[#0088CC]", hoverColor: "group-hover:text-[#0088CC]" },
                { name: "Instagram", href: "#", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", color: "text-[#E4405F]", hoverColor: "group-hover:text-[#E4405F]" },
                { name: "Website", href: "#", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z", color: "text-foreground", hoverColor: "group-hover:text-primary" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <BrandIcon d={social.d} name={social.name} color={social.color} />
                  <div className={`font-semibold transition-colors ${social.hoverColor}`}>{social.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
