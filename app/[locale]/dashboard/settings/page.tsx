import { requireSession, requireStore } from "@/lib/data"
import { SettingsClient } from "@/components/dashboard/settings-client"

export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const session = await requireSession(locale)
  const store = await requireStore(locale)

  return <SettingsClient store={store} user={session.user} />
}
