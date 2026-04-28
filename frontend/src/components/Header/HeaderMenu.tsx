import { Link } from "@tanstack/react-router"
import { LogOut, User as UserIcon } from "lucide-react"

import { ROUTES } from "@/app/routes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HeaderMenuUser = {
  name: string
  username: string
  profileImageUrl?: string
}

type HeaderMenuProps = {
  user: HeaderMenuUser | null
  onSignOut: () => void
  isSigningOut?: boolean
}

export function HeaderMenu({ user, onSignOut, isSigningOut }: HeaderMenuProps) {
  if (!user) {
    return (
      <Button
        asChild
        size="sm"
      >
        <Link to={ROUTES.login}>Sign in</Link>
      </Button>
    )
  }

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="User menu"
          className="rounded-full"
        >
          <Avatar className="size-8">
            {user.profileImageUrl ? (
              <AvatarImage
                src={user.profileImageUrl}
                alt={user.name}
              />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm leading-none font-medium">{user.name}</span>
            <span className="mt-1 text-xs text-muted-foreground">@{user.username}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={ROUTES.userDetail(user.username)}>
            <UserIcon className="size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
