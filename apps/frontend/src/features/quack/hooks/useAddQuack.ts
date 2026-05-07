import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { addQuack } from "@/features/quack/api/addQuack"
import { quackKeys } from "@/features/quack/api/quackKeys"

type UseAddQuackOptions = {
  onCompleted?: () => void
}

export function useAddQuack({ onCompleted }: UseAddQuackOptions = {}) {
  const queryClient = useQueryClient()
  const [text, setText] = useState("")

  const mutation = useMutation({
    mutationFn: addQuack,
    onSuccess: async () => {
      setText("")
      await queryClient.invalidateQueries({ queryKey: quackKeys.all() })
      onCompleted?.()
    },
  })

  return {
    isLoading: mutation.isPending,
    error: mutation.error ?? undefined,
    text,
    setText,
    onSubmit: ({ text: nextText }: { text: string }) => {
      mutation.mutate({ text: nextText })
    },
  }
}
