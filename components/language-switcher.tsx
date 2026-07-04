"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface LanguageSwitcherProps {
  locale: string
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "km" : "en"
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`)
    router.push(newPath)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLocale}
      aria-label="Switch language"
      className="w-9 h-9"
    >
      <Image
        src={locale === "en" ? "/flag-en.png" : "/flag-km.png"}
        alt={locale === "en" ? "English" : "Khmer"}
        width={20}
        height={14}
        className="rounded-sm object-cover"
        style={{ width: "auto", height: "auto" }}
      />
    </Button>
  )
}
