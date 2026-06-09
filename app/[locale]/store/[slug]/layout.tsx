import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { TelegramProvider } from "@/components/telegram-provider"
import { StoreHeader } from "@/components/storefront/store-header"

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  
  const store = await db.store.findUnique({
    where: { slug },
  })

  if (!store) {
    notFound()
  }

  return (
    <TelegramProvider>
      {/* 
        This wrapper applies a mobile-first constraint specifically for the storefront.
        Telegram Mini Apps are primarily used on mobile.
      */}
      <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative shadow-2xl overflow-hidden flex flex-col">
        <StoreHeader storeName={store.name} />
        
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>
      </div>
    </TelegramProvider>
  )
}
