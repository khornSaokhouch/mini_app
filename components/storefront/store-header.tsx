"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"

export function StoreHeader({ storeName }: { storeName: string }) {
  const { theme, setTheme } = useTheme()
  const itemCount = useCartStore(state => state.getItemCount())

  return (
    <header className="sticky top-0 z-50 h-16 border-b flex items-center justify-between px-4 shrink-0 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          {storeName.charAt(0).toUpperCase()}
        </div>
        <span className="font-bold text-lg truncate max-w-[150px]">{storeName}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <ShoppingBag className="h-4 w-4" />
          </Button>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {itemCount}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
