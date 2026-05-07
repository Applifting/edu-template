import { QueryClient, type DefaultOptions } from "@tanstack/react-query"

const defaultQueryConfig = {
  queries: { refetchOnWindowFocus: false, retry: 0 },
} satisfies DefaultOptions

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryConfig,
})
