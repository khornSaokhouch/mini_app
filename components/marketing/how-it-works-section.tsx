import { useTranslations } from "next-intl"
export function HowItWorksSection() {
  const t = useTranslations("HowItWorksSection")
  const steps = [
    {
      step: "1",
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      step: "2",
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      step: "3",
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTUwLCAxNTAsIDE1MCwgMC4wNSkiLz48L3N2Zz4=')] z-0 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">{t("title")}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Theme Accent Connector Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-primary/20 rounded-full -z-0" />

          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-8 relative">
                {/* Outer theme ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20 group-hover:border-primary group-hover:scale-110 transition-all duration-500" />
                
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary/10 relative z-10 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700">
                  {s.step}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
