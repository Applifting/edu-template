import { createFileRoute } from "@tanstack/react-router"

import { Seo } from "@/components/Seo"

export const Route = createFileRoute("/_ProtectedPages/users/$username")({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { username } = Route.useParams()
  return (
    <>
      <Seo title={`@${username}`} />
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-semibold">@{username}</h1>
        <p className="mt-2 text-muted-foreground">
          User profile and quack list arrives in the quack feature commit.
        </p>
      </div>
    </>
  )
}
