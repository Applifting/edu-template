import { useState } from "react"
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router"

import { ROUTES } from "@/app/routes"
import { Seo } from "@/components/Seo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { authSessionQueryOptions } from "@/features/auth/api/authSessionQueryOptions"
import { SignUpForm } from "@/features/auth/components/SignUpForm"
import { useSignUp } from "@/features/auth/hooks/useSignUp"

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
  loader: async ({ context }) => {
    const session = await context.queryClient.ensureQueryData(authSessionQueryOptions())
    if (!session) return
    throw redirect({ to: ROUTES.home })
  },
})

function SignUpPage() {
  const navigate = useNavigate()
  const signUp = useSignUp()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (values: {
    email: string
    name: string
    username: string
    password: string
    profileImage: File | null
  }) => {
    setErrorMessage(null)
    try {
      await signUp.mutateAsync({
        email: values.email,
        password: values.password,
        name: values.name,
        username: values.username,
        profileImage: values.profileImage,
      })
      await navigate({ to: ROUTES.home })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Sign up failed")
    }
  }

  return (
    <>
      <Seo title="Sign up" />
      <main className="grid min-h-svh place-content-center bg-muted px-6 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Create your Quacker account.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm
              isLoading={signUp.isPending}
              errorMessage={errorMessage}
              onSubmit={handleSubmit}
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to={ROUTES.login}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
