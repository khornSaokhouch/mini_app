import { TrendingUp, Smartphone, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

export function FeaturesSection() {
  const t = useTranslations("FeaturesSection")
  const features = [
    {
      title: t("feature1Title"),
      desc: t("feature1Desc"),
      icon: TrendingUp,
    },
    {
      title: t("feature2Title"),
      desc: t("feature2Desc"),
      icon: Smartphone,
    },
    {
      title: t("feature3Title"),
      desc: t("feature3Desc"),
      icon: ShieldCheck,
    },
  ]

  return (
    <section id="features" className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">{t("title")}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((f, i) => (
            <div key={i} className="relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl">
              {/* Subtle background overlay on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <div className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/10">
                <f.icon className="h-8 w-8" />
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
