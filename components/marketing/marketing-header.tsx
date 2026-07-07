"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

interface MarketingHeaderProps {
  locale: string
}

export function MarketingHeader({ locale }: MarketingHeaderProps) {
  const t = useTranslations("MarketingHeader")
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "km" : "en"
    // Replace the current locale prefix in the pathname
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`)
    router.push(newPath)
  }

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "#features", label: t("features") },
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#pricing", label: t("pricing") },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between relative">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-bold tracking-tight text-xl sm:text-2xl">{t("title")}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 hover:border-primary/50 bg-background hover:bg-muted/50 transition-all text-sm font-semibold"
            aria-label="Switch language"
          >
            <Image
              src={locale === "en" ? "/flag-en.png" : "/flag-km.png"}
              alt={locale === "en" ? "English" : "Khmer"}
              width={20}
              height={14}
              className="rounded-sm object-cover"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-xs font-bold uppercase">{locale === "en" ? "EN" : "KM"}</span>
          </button>

          <Link href={`/${locale}/login`} className="text-sm font-semibold hover:text-primary transition-colors">
            {t("login")}
          </Link>
          <Link
            href={`/${locale}/register`}
            className={buttonVariants({ size: "default", className: "rounded-full px-6 shadow-md transition-all hover:scale-105" })}
          >
            {t("startFreeTrial")}
          </Link>
        </div>

        {/* Mobile: Lang toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Language Switcher Mobile */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border/50 hover:border-primary/50 bg-background hover:bg-muted/50 transition-all"
            aria-label="Switch language"
          >
            <Image
              src={locale === "en" ? "/flag-en.png" : "/flag-km.png"}
              alt={locale === "en" ? "English" : "Khmer"}
              width={18}
              height={12}
              className="rounded-sm object-cover"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="text-xs font-bold uppercase">{locale === "en" ? "EN" : "KM"}</span>
          </button>

          {/* Hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-full"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border/30 bg-background/95 backdrop-blur-xl ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-4 rounded-xl text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-border/30 my-2" />

          <Link
            href={`/${locale}/login`}
            onClick={() => setMobileOpen(false)}
            className="py-3 px-4 rounded-xl text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            Log in
          </Link>
          <Link
            href={`/${locale}/register`}
            onClick={() => setMobileOpen(false)}
            className={buttonVariants({ size: "lg", className: "w-full rounded-full text-base h-12 mt-2 shadow-md" })}
          >
            Start Free Trial
          </Link>
        </nav>
      </div>
    </header>
  )
}
