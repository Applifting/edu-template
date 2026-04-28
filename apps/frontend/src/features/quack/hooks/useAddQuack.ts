import { useState } from "react"
import { useMutation } from "@apollo/client"

import { AddQuackMutation } from "@/features/quack/api/AddQuackMutation"

type UseAddQuackOptions = {
  onCompleted?: () => void
}

export function useAddQuack({ onCompleted }: UseAddQuackOptions = {}) {
  const [text, setText] = useState("")
  const [mutate, { loading: isLoading, error }] = useMutation(AddQuackMutation, {
    onCompleted: () => {
      setText("")
      onCompleted?.()
    },
  })

  return {
    isLoading,
    error: error ? new Error(error.message) : undefined,
    text,
    setText,
    onSubmit: ({ text: nextText }: { text: string }) => {
      void mutate({ variables: { text: nextText } })
    },
  }
}
