"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Menu, Globe, Bell } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useRouter, usePathname } from "next/navigation"
import { useSidebarStore } from "@/lib/store"
import { signOut } from "next-auth/react"

interface HeaderProps {
  locale?: string
  user?: any
}

export function Header({ locale = "en", user }: HeaderProps) {
  const { setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar)

  const toggleLanguage = () => {
    const otherLocale = locale === "en" ? "km" : "en"
    router.push(pathname.replace(`/${locale}`, `/${otherLocale}`))
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 md:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <div className="hidden md:flex flex-col">
          <span className="text-sm font-semibold truncate max-w-[200px]">{user?.name || "Demo Store"}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">{user?.email || "store owner"}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 text-xs font-medium">
          <Globe className="h-4 w-4" />
          {locale.toUpperCase()}
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Theme toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>☀️ Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>🌙 Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>💻 System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={user?.name || "@admin"} />
              <AvatarFallback className="text-xs uppercase">{user?.name?.slice(0, 2) || user?.email?.slice(0, 2) || "AD"}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Store Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: `/${locale}` })} className="text-red-600 focus:bg-red-50 focus:text-red-600">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
