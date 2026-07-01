import { TrendingUp, Smartphone, ShieldCheck } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Smart Inventory",
      desc: "Real-time stock tracking with low-stock alerts, movement history, and multi-location support.",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "Telegram Native",
      desc: "Customers can browse your store and checkout natively inside Telegram without leaving the app.",
      icon: Smartphone,
      color: "from-violet-500 to-fuchsia-500",
      shadow: "shadow-violet-500/20"
    },
    {
      title: "Secure Payments",
      desc: "Integrated payment processing with dynamic invoicing, automated receipts, and tax calculation.",
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20"
    },
  ]

  return (
    <section id="features" className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">scale</span></h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Powerful tools designed for modern store owners to manage every aspect of their business efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((f, i) => (
            <div key={i} className={`relative bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${f.shadow}`}>
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <f.icon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
