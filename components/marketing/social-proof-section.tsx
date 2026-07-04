import { useTranslations } from "next-intl"

export function SocialProofSection() {
  const t = useTranslations("SocialProofSection")
  const brands = ["BrandOne", "GlobalCorp", "TechStore", "FashionHub"]

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 text-center flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">{t("title")}</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, i) => (
            <div key={i} className="text-xl md:text-2xl font-black">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
