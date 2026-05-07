import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Loader2, RefreshCw } from "lucide-react"

import { NotFound } from "@/components/Error/NotFound"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"

import { userByUsernameQueryOptions } from "@/features/auth/api/userQueryOptions"
import { useSession } from "@/features/auth/hooks/useSession"
import { userQuacksQueryOptions } from "@/features/quack/api/quacksQueryOptions"
import { QuackForm } from "@/features/quack/components/QuackForm"
import { QuackList } from "@/features/quack/components/QuackList"
import { UserDetailHeader } from "@/features/quack/components/UserDetailHeader"

export const Route = createFileRoute("/_ProtectedPages/users/$username")({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { username } = Route.useParams()
  const { user: currentUser } = useSession()

  const userQuery = useQuery(userByUsernameQueryOptions(username))
  const quacksQuery = useQuery({
    ...userQuacksQueryOptions(username),
    enabled: Boolean(userQuery.data),
  })

  const reload = () => {
    void userQuery.refetch()
    void quacksQuery.refetch()
  }

  const user = userQuery.data
  const isOwnProfile = currentUser?.username === username

  if (userQuery.data === null) {
    return <NotFound />
  }

  return (
    <>
      <Seo title={user ? `@${user.username}` : `@${username}`} />
      <section className="mx-auto w-full max-w-2xl px-4 py-8">
        {userQuery.isLoading && !user ? (
          <div className="flex justify-center py-8 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : null}

        {user ? (
          <>
            <UserDetailHeader
              name={user.name}
              username={user.username}
              profileImageUrl={user.profileImageUrl ?? undefined}
            />

            {isOwnProfile ? (
              <QuackForm
                onPosted={reload}
                className="mb-4"
              />
            ) : null}

            <div className="mb-2 flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={reload}
                disabled={quacksQuery.isFetching}
              >
                <RefreshCw className="size-4" />
                Reload
              </Button>
            </div>

            <QuackList
              quacks={quacksQuery.data ?? []}
              isLoading={quacksQuery.isLoading}
              error={quacksQuery.error ?? undefined}
              onReload={reload}
            />
          </>
        ) : null}
      </section>
    </>
  )
}
