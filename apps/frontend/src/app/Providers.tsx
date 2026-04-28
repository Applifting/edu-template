import { ApolloProvider } from "@apollo/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"

import { router } from "@/app/router"
import { apolloClient } from "@/config/apollo"
import { queryClient } from "@/config/react-query"
import { ThemeProvider } from "@/hooks/useTheme"

export function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  )
}
