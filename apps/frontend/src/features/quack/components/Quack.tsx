import { Link } from "@tanstack/react-router"

import { ROUTES } from "@/app/routes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/date"

import type { Quack as QuackData } from "@/features/quack/api/quackSchemas"
import { UsersName } from "@/features/quack/components/UsersName"
import { UsersUserName } from "@/features/quack/components/UsersUserName"

type QuackProps = { quack: QuackData }

export function Quack({ quack }: QuackProps) {
  const { name, username, profileImageUrl } = quack.user

  const linkToUser = ROUTES.userDetail(username)
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="flex w-full gap-4 border-b border-border pt-2 pb-4">
      <Link to={linkToUser}>
        <Avatar className="size-12">
          {profileImageUrl ? (
            <AvatarImage
              src={profileImageUrl}
              alt={name}
            />
          ) : null}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <Link
            to={linkToUser}
            className="hover:underline"
          >
            <UsersName name={name} /> <UsersUserName username={username} />
          </Link>
          <span className="text-xs text-muted-foreground">·</span>
          <time className="text-xs text-muted-foreground">{formatDate(quack.createdAt)}</time>
        </div>
        <p className="text-sm break-words whitespace-pre-line">{quack.text}</p>
      </div>
    </article>
  )
}
