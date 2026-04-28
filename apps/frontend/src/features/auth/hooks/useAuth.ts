import { useApolloClient } from "@apollo/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { ROUTES } from "@/app/routes"

import { authKeys } from "@/features/auth/api/authKeys"
import { authSessionQueryOptions, type Session } from "@/features/auth/api/authSessionQueryOptions"
import { SignUpMutation } from "@/features/auth/api/SignUpMutation"
import { authClient } from "@/features/auth/lib/auth-client"

export function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const apolloClient = useApolloClient()

  const { data: session, isPending, error } = useQuery(authSessionQueryOptions())
  const user = session?.user ?? null

  const signIn = useMutation({
    mutationFn: async (input: { email: string; password: string; rememberMe?: boolean }) => {
      const { error: signInError } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
        rememberMe: input.rememberMe ?? false,
      })
      if (signInError) throw new Error(signInError.message ?? "Sign in failed")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.session() })
    },
  })

  const signUp = useMutation({
    mutationFn: async (input: {
      email: string
      password: string
      name: string
      username: string
      profileImage?: File | null
    }) => {
      await apolloClient.mutate({
        mutation: SignUpMutation,
        variables: {
          data: {
            email: input.email,
            password: input.password,
            name: input.name,
            username: input.username,
            profilePicture: input.profileImage ?? undefined,
          },
        },
      })
      const { error: signInError } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
      })
      if (signInError) throw new Error(signInError.message ?? "Sign in failed after sign up")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.session() })
    },
  })

  const signOut = useMutation({
    mutationFn: async () => {
      await authClient.signOut()
    },
    onSuccess: async () => {
      queryClient.setQueryData<Session>(authKeys.session(), null)
      await queryClient.invalidateQueries({ queryKey: authKeys.session() })
      await navigate({ to: ROUTES.login })
    },
  })

  return {
    isPending,
    error: error ?? null,
    user,
    signIn,
    signUp,
    signOut,
  }
}
