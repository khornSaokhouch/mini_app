import { TrendingUp, Smartphone, ShieldCheck } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Smart Inventory",
      desc: "Real-time stock tracking with low-stock alerts, movement history, and multi-location support.",
      icon: TrendingUp,
    },
    {
      title: "Telegram Native",
      desc: "Customers can browse your store and checkout natively inside Telegram without leaving the app.",
      icon: Smartphone,
    },
    {
      title: "Secure Payments",
      desc: "Integrated payment processing with dynamic invoicing, automated receipts, and tax calculation.",
      icon: ShieldCheck,
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30 border-y">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Everything you need to scale</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Powerful tools designed for modern store owners to manage every aspect of their business efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((f, i) => (
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
  )
}
