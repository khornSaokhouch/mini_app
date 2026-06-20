import Link from "next/link"
import { Store } from "lucide-react"

export function MarketingFooter() {
  return (
    <footer className="border-t py-12 md:py-16 bg-muted/10">
      <div className="container mx-auto px-6 md:px-8">
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

        <div className="border-t mt-12 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 KhMarket Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
