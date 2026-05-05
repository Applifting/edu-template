import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserDetailHeaderProps = {
  name: string
  username: string
  profileImageUrl?: string | null
}

export function UserDetailHeader({ name, username, profileImageUrl }: UserDetailHeaderProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="mb-6 flex items-center gap-4">
      <Avatar className="size-20">
        {profileImageUrl ? (
          <AvatarImage
            src={profileImageUrl}
            alt={name}
          />
        ) : null}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl leading-tight font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground">@{username}</p>
      </div>
    </header>
  )
}
