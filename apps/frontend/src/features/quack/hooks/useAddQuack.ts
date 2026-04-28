import { useState } from "react"
import { useMutation } from "@apollo/client"

import { AddQuackMutation } from "@/features/quack/api/AddQuackMutation"

type UseAddQuackOptions = {
  onCompleted?: () => void
}

export function useAddQuack({ onCompleted }: UseAddQuackOptions = {}) {
  const [text, setText] = useState("")
  const [mutate, mutationState] = useMutation(AddQuackMutation, {
    onCompleted: () => {
      setText("")
      onCompleted?.()
    },
    onError: () => {
      // Surface as `error` from the mutation result instead of throwing.
    },
  })

  const submit = ({ text: nextText }: { text: string }) => {
    void mutate({ variables: { text: nextText } })
  }

  return {
    isLoading: mutationState.loading,
    error: mutationState.error ? new Error(mutationState.error.message) : undefined,
    text,
    setText,
    onSubmit: submit,
  }
}

export type UseAddQuackReturn = ReturnType<typeof useAddQuack>
