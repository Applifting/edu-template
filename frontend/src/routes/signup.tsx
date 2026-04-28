import { createFileRoute, redirect } from "@tanstack/react-router"

import { ROUTES } from "@/app/routes"
import { Seo } from "@/components/Seo"

import { authSessionQueryOptions } from "@/features/auth/api/authSessionQueryOptions"

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(authSessionQueryOptions())
    if (!session) return
    throw redirect({ to: ROUTES.home })
  },
})

function SignUpPage() {
  return (
    <>
      <Seo title="Sign up" />
      <main className="grid min-h-svh place-content-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-center text-2xl font-semibold">Sign up</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Sign up form arrives in the auth feature commit.
          </p>
        </div>
      </main>
    </>
  )
}
