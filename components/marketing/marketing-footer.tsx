import Link from "next/link"
import { useTranslations } from "next-intl"
import { Store } from "lucide-react"

export function MarketingFooter() {
  const t = useTranslations("MarketingFooter")
  return (
    <footer className="relative border-t border-white/10 py-12 md:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-xl">{t("title")}</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">{t("product")}</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("features")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("pricing")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("telegramSdk")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("changelog")}</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">{t("resources")}</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("documentation")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("apiReference")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("blog")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("community")}</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">{t("company")}</h4>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("aboutUs")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("careers")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("contacts")}</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t("legal")}</Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">{t("privacyPolicy")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("termsOfService")}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t("cookiesSettings")}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
