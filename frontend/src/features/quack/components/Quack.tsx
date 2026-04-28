import { Link } from "@tanstack/react-router"

import { ROUTES } from "@/app/routes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFragment } from "@/gql"
import { formatDate } from "@/lib/date"

import {
  BaseQuackFragment,
  type BaseQuackFragmentType,
} from "@/features/quack/api/BaseQuackFragment"
import { UsersName } from "@/features/quack/components/UsersName"
import { UsersUserName } from "@/features/quack/components/UsersUserName"

type QuackProps = { quackFragment: BaseQuackFragmentType }

export function Quack({ quackFragment }: QuackProps) {
  const fragment = useFragment(BaseQuackFragment, quackFragment) as {
    text: string
    createdAt: string
    user: { name: string; username: string; profileImageUrl?: string | null }
  }
  const { user, text, createdAt } = fragment
  const { name, username, profileImageUrl } = user

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
          <time className="text-xs text-muted-foreground">{formatDate(createdAt)}</time>
        </div>
        <p className="text-sm break-words whitespace-pre-line">{text}</p>
      </div>
    </article>
  )
}
