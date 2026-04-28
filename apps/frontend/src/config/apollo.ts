import { ApolloClient, from, InMemoryCache } from "@apollo/client"
import type { NetworkError } from "@apollo/client/errors"
import { onError } from "@apollo/client/link/error"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"
import type { GraphQLFormattedError } from "graphql"

import { env } from "@/config/env"
import { queryClient } from "@/config/react-query"
import { authKeys } from "@/lib/auth-keys"

const UNAUTHENTICATED_CODE = "UNAUTHENTICATED"

const hasUnauthenticatedErrorCode = (errors: readonly GraphQLFormattedError[] | undefined) =>
  errors?.some((error) => error.extensions?.code === UNAUTHENTICATED_CODE) ?? false

const hasNetworkStatusCode = (error: NetworkError | undefined | null, code: number) => {
  if (!error) return false
  return "statusCode" in error && error.statusCode === code
}

// On 401 / UNAUTHENTICATED, drop the auth session query so the next protected
// route loader sees no session and redirects through the standard login flow.
const onAuthError = onError(({ graphQLErrors, networkError }) => {
  if (hasUnauthenticatedErrorCode(graphQLErrors) || hasNetworkStatusCode(networkError, 401)) {
    void queryClient.invalidateQueries({ queryKey: authKeys.session() })
  }
})

// `Apollo-Require-Preflight` opts the request into Apollo Server's CSRF
// prevention; required for multipart (file upload) operations.
const uploadLink = createUploadLink({
  uri: env.VITE_GRAPHQL_API,
  headers: { "Apollo-Require-Preflight": "ok" },
  credentials: "include",
})

export const apolloClient = new ApolloClient({
  link: from([onAuthError, uploadLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
    query: { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-first" },
  },
  connectToDevTools: import.meta.env.DEV,
})
