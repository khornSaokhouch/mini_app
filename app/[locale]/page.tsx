"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Store, ArrowRight, TrendingUp, Smartphone, ShieldCheck, Menu } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MarketingPage() {
  const t = useTranslations('Index')
  const params = useParams()
  const locale = (params?.locale as string) || "en"

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Store className="h-6 w-6" />
            </div>
            <span className="font-bold tracking-tight text-2xl hidden sm:block">KhMarket</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href={`/${locale}/login`} className="text-sm font-semibold hover:text-primary transition-colors">Log in</Link>
            <Link href={`/${locale}/register`} className={buttonVariants({ size: "default", className: "rounded-full px-6" })}>
              Start Free Trial
            </Link>
          </div>

          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "lg:hidden" })}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <Link href="#features" className="text-lg font-semibold">Features</Link>
                <Link href="#how-it-works" className="text-lg font-semibold">How it Works</Link>
                <Link href="#pricing" className="text-lg font-semibold">Pricing</Link>
                <hr />
                <Link href={`/${locale}/login`} className="text-lg font-semibold">Log in</Link>
                <Link href={`/${locale}/register`} className={buttonVariants({ size: "lg", className: "w-full rounded-full" })}>Start Free Trial</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />

          <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-sm font-semibold bg-primary/5 text-primary mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                Telegram Mini App SDK now supported
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Your store, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">everywhere.</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-xl leading-relaxed">
                The all-in-one platform to manage inventory, process payments, and sell beautifully on the Web and directly inside Telegram.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href={`/${locale}/register`} className={buttonVariants({ size: "lg", className: "gap-2 text-md h-14 px-8 rounded-full w-full sm:w-auto shadow-lg shadow-primary/20" })}>
                  Create Your Store <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="#demo" className={buttonVariants({ size: "lg", variant: "outline", className: "text-md h-14 px-8 rounded-full w-full sm:w-auto" })}>
                  Book Demo
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-medium">No credit card required • 14-day free trial</p>
            </div>

            {/* Device Mockups */}
            <div className="flex-1 w-full relative h-[400px] md:h-[500px] lg:h-[600px] flex justify-center lg:justify-end perspective-1000 mt-12 lg:mt-0">

              {/* Desktop Frame */}
              <div className="absolute right-0 top-10 lg:top-0 w-[120%] lg:w-[150%] max-w-[800px] rounded-xl overflow-hidden border border-border shadow-2xl bg-card hidden md:flex flex-col z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                <div className="h-8 bg-muted flex items-center px-4 gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="mx-auto bg-background/50 rounded-md h-5 w-64 text-[10px] flex items-center justify-center text-muted-foreground font-mono">dashboard.khmarket.com</div>
                </div>
                <div className="p-4 bg-muted/20 flex gap-4">
                  <div className="w-48 bg-card rounded-lg border p-4 space-y-3 h-[400px]">
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-primary/10 rounded w-full" />
                    <div className="h-8 bg-muted rounded w-full" />
                    <div className="h-8 bg-muted rounded w-full" />
                    <div className="h-8 bg-muted rounded w-full" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-card rounded-lg border p-4"><div className="h-4 bg-muted rounded w-1/2 mb-2" /><div className="h-8 bg-muted rounded w-3/4" /></div>
                      <div className="h-24 bg-card rounded-lg border p-4"><div className="h-4 bg-muted rounded w-1/2 mb-2" /><div className="h-8 bg-muted rounded w-3/4" /></div>
                      <div className="h-24 bg-card rounded-lg border p-4"><div className="h-4 bg-muted rounded w-1/2 mb-2" /><div className="h-8 bg-muted rounded w-3/4" /></div>
                    </div>
                    <div className="h-48 bg-card rounded-lg border flex items-end p-4 gap-2">
                      <div className="h-[40%] w-full bg-primary/20 rounded-t" />
                      <div className="h-[70%] w-full bg-primary/40 rounded-t" />
                      <div className="h-[50%] w-full bg-primary/30 rounded-t" />
                      <div className="h-[90%] w-full bg-primary rounded-t" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Telegram Frame */}
              <div className="absolute right-auto lg:right-[-40px] top-0 md:top-32 lg:top-40 w-[280px] h-[580px] rounded-[3rem] border-[8px] border-slate-900 bg-background shadow-2xl overflow-hidden z-20 flex flex-col transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 mx-auto">
                <div className="absolute top-0 w-full h-7 flex justify-center">
                  <div className="w-1/3 h-full bg-slate-900 rounded-b-xl" />
                </div>
                <div className="h-14 bg-blue-500 flex items-end justify-center pb-3 text-white font-semibold">
                  Telegram Mini App
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3">
                  <div className="h-10 bg-muted rounded-full" />
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="aspect-square bg-card border rounded-2xl flex flex-col items-center justify-center p-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 mb-2" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                    <div className="aspect-square bg-card border rounded-2xl flex flex-col items-center justify-center p-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 mb-2" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                    <div className="aspect-square bg-card border rounded-2xl flex flex-col items-center justify-center p-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 mb-2" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                    <div className="aspect-square bg-card border rounded-2xl flex flex-col items-center justify-center p-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 mb-2" />
                      <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t bg-card">
                  <div className="h-12 bg-primary rounded-full w-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                    ADD TO CART
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 md:py-32 bg-muted/30 border-y">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold tracking-tight">Everything you need to scale</h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Powerful tools designed for modern store owners to manage every aspect of their business efficiently.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: "Smart Inventory", desc: "Real-time stock tracking with low-stock alerts, movement history, and multi-location support.", icon: TrendingUp },
                { title: "Telegram Native", desc: "Customers can browse your store and checkout natively inside Telegram without leaving the app.", icon: Smartphone },
                { title: "Secure Payments", desc: "Integrated payment processing with dynamic invoicing, automated receipts, and tax calculation.", icon: ShieldCheck },
              ].map((f, i) => (
                <div key={i} className="bg-background rounded-3xl p-8 shadow-sm border hover:shadow-md transition-shadow group">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold tracking-tight">How it Works</h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Get your store up and running in minutes with our simple three-step process.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Line (hidden on mobile) */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-muted -z-0"></div>
              
              {[
                { step: "1", title: "Create Your Account", desc: "Sign up and set up your store profile in seconds. No technical knowledge required." },
                { step: "2", title: "Add Your Products", desc: "Easily manage inventory, upload photos, and set prices from our intuitive dashboard." },
                { step: "3", title: "Start Selling Everywhere", desc: "Launch on the web and integrate seamlessly with Telegram to reach your customers where they are." }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10">
                  <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-6 relative">
                     <div className="absolute inset-0 rounded-full border-4 border-background"></div>
                     <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
                       {s.step}
                     </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-10">Trusted by over 2,000+ modern merchants</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl md:text-2xl font-black">BrandOne</div>
              <div className="text-xl md:text-2xl font-black">GlobalCorp</div>
              <div className="text-xl md:text-2xl font-black">TechStore</div>
              <div className="text-xl md:text-2xl font-black">FashionHub</div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-16 bg-muted/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Store className="h-6 w-6 text-primary" />
                <span className="font-bold tracking-tight text-xl">KhMarket</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Empowering merchants to sell everywhere. Build your store, manage inventory, and grow your audience seamlessly.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg">Product</h4>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Telegram SDK</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Changelog</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg">Resources</h4>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Documentation</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">API Reference</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Community</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg">Company</h4>
              <Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Contacts</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Legal</Link>
            </div>
          </div>

          <div className="border-t mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 KhMarket Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
