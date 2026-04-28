import { HeaderLogo } from "@/components/Header/HeaderLogo"
import { HeaderMenu } from "@/components/Header/HeaderMenu"
import { HeaderNav } from "@/components/Header/HeaderNav"
import { ThemeSwitcher } from "@/components/Header/ThemeSwitcher"

type HeaderUser = {
  name: string
  username: string
  profileImageUrl?: string
}

type HeaderProps = {
  user: HeaderUser | null
  onSignOut: () => void
  isSigningOut?: boolean
}

export function Header({ user, onSignOut, isSigningOut }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center gap-4 px-4">
        <HeaderLogo />
        <HeaderNav />
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <HeaderMenu
            user={user}
            onSignOut={onSignOut}
            isSigningOut={isSigningOut}
          />
        </div>
      </div>
    </header>
  )
}
