import { TelegramProvider } from "@/components/telegram-provider"

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params

  return (
    <TelegramProvider>
      {/* 
        This wrapper applies a mobile-first constraint specifically for the storefront.
        Telegram Mini Apps are primarily used on mobile.
      */}
      <div className="min-h-screen bg-[var(--tg-theme-bg-color,white)] text-[var(--tg-theme-text-color,black)] max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
        {/* We can fetch store info by slug here to customize the header */}
        <header className="h-14 border-b flex items-center px-4 shrink-0 bg-[var(--tg-theme-bg-color,white)]">
          <span className="font-bold text-lg capitalize">{slug.replace("-", " ")}</span>
        </header>
        
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
      </div>
    </TelegramProvider>
  )
}
