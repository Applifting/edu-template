import { useQuery } from "@apollo/client"
import { createFileRoute } from "@tanstack/react-router"
import { Loader2, RefreshCw } from "lucide-react"

import { NotFound } from "@/components/Error/NotFound"
import { Seo } from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { gql, useFragment } from "@/gql"

import { useAuth } from "@/features/auth/hooks/useAuth"
import { QuackUserDetailFragment } from "@/features/quack/api/QuackUserDetailFragment"
import { QuackForm } from "@/features/quack/components/QuackForm"
import { QuackList } from "@/features/quack/components/QuackList"
import { UserDetailHeader } from "@/features/quack/components/UserDetailHeader"
import { useAddQuack } from "@/features/quack/hooks/useAddQuack"

const UserDetailQuery = gql(/* GraphQL */ `
  query UserDetail($username: String!) {
    user(username: $username) {
      ...QuackUserDetail
    }
  }
`)

export const Route = createFileRoute("/_ProtectedPages/users/$username")({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { username } = Route.useParams()
  const { user: currentUser } = useAuth()
  const userQuery = useQuery(UserDetailQuery, { variables: { username } })

  const reload = () => {
    void userQuery.refetch()
  }

  const addQuack = useAddQuack({ onCompleted: reload })
  const user = useFragment(QuackUserDetailFragment, userQuery.data?.user)
  const isOwnProfile = currentUser?.username === username

  if (userQuery.data?.user === null) {
    return <NotFound />
  }

  return (
    <>
      <Seo title={user ? `@${user.username}` : `@${username}`} />
      <section className="mx-auto w-full max-w-2xl px-4 py-8">
        {userQuery.loading && !user ? (
          <div className="flex justify-center py-8 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : null}

        {user ? (
          <>
            <UserDetailHeader
              name={user.name}
              username={user.username}
              profileImageUrl={user.profileImageUrl}
            />

            {isOwnProfile ? (
              <QuackForm
                {...addQuack}
                className="mb-4"
              />
            ) : null}

            <div className="mb-2 flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={reload}
                disabled={userQuery.loading}
              >
                <RefreshCw className="size-4" />
                Reload
              </Button>
            </div>

            <QuackList
              quacks={user.quacks}
              isLoading={userQuery.loading}
              error={userQuery.error ? new Error(userQuery.error.message) : undefined}
              onReload={reload}
            />
          </>
        ) : null}
      </section>
    </>
  )
}
