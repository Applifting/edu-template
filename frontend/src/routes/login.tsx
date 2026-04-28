import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from "zod"

import { ROUTES } from "@/app/routes"
import { Seo } from "@/components/Seo"

import { authSessionQueryOptions } from "@/features/auth/api/authSessionQueryOptions"
import { decodeRedirectUri } from "@/features/auth/lib/redirect"

const loginSearchParamsSchema = z.object({
  from: z.string().optional(),
})

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: loginSearchParamsSchema,
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(authSessionQueryOptions())
    if (!session) return
    throw redirect({ to: ROUTES.home })
  },
})

function LoginPage() {
  const { from } = Route.useSearch()
  const redirectTo = from ? decodeRedirectUri(from) : ROUTES.home

  return (
    <>
      <Seo title="Sign in" />
      <main className="grid min-h-svh place-content-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-center text-2xl font-semibold">Sign in</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Sign in form arrives in the auth feature commit.
          </p>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            After sign in you&apos;ll be redirected to <code>{redirectTo}</code>.
          </p>
        </div>
      </main>
    </>
  )
}
