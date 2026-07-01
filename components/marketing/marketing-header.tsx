"use client"

import Link from "next/link"
import { Store, Menu, Sun, Moon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

interface MarketingHeaderProps {
  locale: string
}

export function MarketingHeader({ locale }: MarketingHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-bold tracking-tight text-xl sm:text-2xl">Online Shop Platform</span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Dark/Light Toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Link href={`/${locale}/login`} className="text-sm font-semibold hover:text-violet-500 transition-colors">Log in</Link>
          <Link href={`/${locale}/register`} className={buttonVariants({ size: "default", className: "rounded-full px-6 shadow-md transition-all hover:scale-105" })}>
            Start Free Trial
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent className="!w-full !sm:max-w-none flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
                <Link href="#features" className="text-2xl font-bold hover:text-primary transition-colors">Features</Link>
                <Link href="#how-it-works" className="text-2xl font-bold hover:text-primary transition-colors">How it Works</Link>
                <Link href="#pricing" className="text-2xl font-bold hover:text-primary transition-colors">Pricing</Link>
                <hr className="w-full opacity-20" />
                <Link href={`/${locale}/login`} className="text-2xl font-bold hover:text-violet-500 transition-colors">Log in</Link>
                <Link href={`/${locale}/register`} className={buttonVariants({ size: "lg", className: "w-full rounded-full text-lg h-14 shadow-lg transition-all hover:scale-[1.02]" })}>
                  Start Free Trial
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
