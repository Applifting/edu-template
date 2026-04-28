import { useState } from "react"
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router"
import { z } from "zod"

import { ROUTES } from "@/app/routes"
import { Seo } from "@/components/Seo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { authSessionQueryOptions } from "@/features/auth/api/authSessionQueryOptions"
import { SignInForm } from "@/features/auth/components/SignInForm"
import { useSignIn } from "@/features/auth/hooks/useSignIn"
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
  const navigate = useNavigate()
  const signIn = useSignIn()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (values: { email: string; password: string }) => {
    setErrorMessage(null)
    try {
      await signIn.mutateAsync(values)
      await navigate({ to: redirectTo })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Sign in failed")
    }
  }

  return (
    <>
      <Seo title="Sign in" />
      <main className="grid min-h-svh place-content-center bg-muted px-6">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your Quacker account.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm
              isLoading={signIn.isPending}
              errorMessage={errorMessage}
              onSubmit={handleSubmit}
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              No account?{" "}
              <Link
                to={ROUTES.signup}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
