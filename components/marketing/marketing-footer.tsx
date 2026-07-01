import Link from "next/link"
import { Store } from "lucide-react"

export function MarketingFooter() {
  return (
    <footer className="relative border-t border-white/10 py-12 md:py-16 bg-background overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-violet-500/10 to-transparent blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-xl">Online Shop Platform</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Empowering merchants to sell everywhere. Build your store, manage inventory, and grow your audience seamlessly.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Product</h4>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Features</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Pricing</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Telegram SDK</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Changelog</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Resources</h4>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Documentation</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">API Reference</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Blog</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Community</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Company</h4>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">About Us</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Careers</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Contacts</Link>
            <Link href="#" className="text-muted-foreground hover:text-violet-500 transition-colors">Legal</Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Online Shop Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
