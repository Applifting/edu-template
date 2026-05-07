import { useMutation, useQueryClient } from "@tanstack/react-query"

import { authKeys } from "@/lib/auth-keys"

import { signUp, type SignUpInput } from "@/features/auth/api/signUp"
import { authClient } from "@/features/auth/lib/auth-client"

export function useSignUp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: SignUpInput) => {
      await signUp(input)
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
