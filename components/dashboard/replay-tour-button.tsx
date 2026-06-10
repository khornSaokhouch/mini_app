"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ReplayTourButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 rounded-full hidden sm:flex"
      onClick={() => {
        localStorage.removeItem("hasSeenDashboardTour")
        location.reload()
      }}
    >
      <HelpCircle className="h-4 w-4" />
      Replay Tour
    </Button>
  )
}
