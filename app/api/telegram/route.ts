import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// POST /api/telegram?storeId=xxx  — called by Telegram for every update
export async function POST(req: NextRequest) {
  try {
    const storeId = req.nextUrl.searchParams.get("storeId")
    if (!storeId) {
      return NextResponse.json({ ok: false, error: "Missing storeId" }, { status: 400 })
    }

    const store = await db.store.findUnique({ where: { id: storeId } })
    if (!store || !store.telegramBot) {
      return NextResponse.json({ ok: false, error: "Store or bot token not found" }, { status: 404 })
    }

    const body = await req.json()
    const message = body?.message
    if (!message) {
      return NextResponse.json({ ok: true }) // not a message update, ignore
    }

    const chatId = message.chat?.id
    const text: string = message.text || ""
    const token = store.telegramBot
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || ""
    const storeUrl = `${appUrl}/en/store/${store.slug}`

    // Handle /start command
    if (text.startsWith("/start")) {
      await sendTelegramMessage(token, chatId, {
        text: `👋 Welcome to *${store.name}*!\n\nTap the button below to open our store.`,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[
            {
              text: `🛍️ Open ${store.name}`,
              web_app: { url: storeUrl },
            },
          ]],
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[Telegram Webhook Error]", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

// Helper — send a message via Telegram Bot API
async function sendTelegramMessage(token: string, chatId: number, payload: Record<string, unknown>) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, ...payload }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error("[sendTelegramMessage]", err)
  }
}
