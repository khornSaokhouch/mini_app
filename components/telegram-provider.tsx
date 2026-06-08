"use client"

import { useEffect, useState } from "react"
import WebApp from "@twa-dev/sdk"

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Telegram WebApp
      WebApp.ready()
      
      // Expand the WebApp to full height
      WebApp.expand()
      
      // Setup theme colors based on Telegram client
      document.documentElement.style.setProperty('--tg-theme-bg-color', WebApp.themeParams.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', WebApp.themeParams.text_color || '#000000')
      document.documentElement.style.setProperty('--tg-theme-hint-color', WebApp.themeParams.hint_color || '#999999')
      document.documentElement.style.setProperty('--tg-theme-link-color', WebApp.themeParams.link_color || '#2481cc')
      document.documentElement.style.setProperty('--tg-theme-button-color', WebApp.themeParams.button_color || '#2481cc')
      document.documentElement.style.setProperty('--tg-theme-button-text-color', WebApp.themeParams.button_text_color || '#ffffff')
      
      setIsReady(true)
    }
  }, [])

  // If we are strictly enforcing Telegram only, we could show a fallback here.
  // But for now, we just render children so it works on web too.
  return <>{children}</>
}
