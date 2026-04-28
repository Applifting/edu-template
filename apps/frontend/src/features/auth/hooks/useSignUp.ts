import { useApolloClient } from "@apollo/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { authKeys } from "@/lib/auth-keys"

import { SignUpMutation } from "@/features/auth/api/SignUpMutation"
import { authClient } from "@/features/auth/lib/auth-client"

type SignUpInput = {
  email: string
  password: string
  name: string
  username: string
  profileImage?: File | null
}

export function useSignUp() {
  const queryClient = useQueryClient()
  const apolloClient = useApolloClient()

  return useMutation({
    mutationFn: async (input: SignUpInput) => {
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
      const { error } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
      })
      if (error) throw new Error(error.message ?? "Sign in failed after sign up")
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: authKeys.session() })
    },
  })
}
