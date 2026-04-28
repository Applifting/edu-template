import { ApolloClient, from, InMemoryCache } from "@apollo/client"
import type { NetworkError } from "@apollo/client/errors"
import { onError } from "@apollo/client/link/error"
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"
import type { GraphQLFormattedError } from "graphql"

import { env } from "@/config/env"
import { queryClient } from "@/config/react-query"

// Duplicated intentionally: config/ sits below features/ in the layer
// graph so it can't import from features/auth/api/authKeys. Keep this in
// sync with features/auth/api/authKeys.ts.
const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const
const UNAUTHENTICATED_CODE = "UNAUTHENTICATED"

const hasUnauthenticatedErrorCode = (errors: readonly GraphQLFormattedError[] | undefined) =>
  errors?.some((error) => error.extensions?.code === UNAUTHENTICATED_CODE) ?? false

const hasNetworkStatusCode = (error: NetworkError | undefined | null, code: number) => {
  if (!error) return false
  return "statusCode" in error && error.statusCode === code
}

const onAuthError = onError(({ graphQLErrors, networkError }) => {
  if (hasUnauthenticatedErrorCode(graphQLErrors) || hasNetworkStatusCode(networkError, 401)) {
    queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, null)
    void queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY })
  }
})

const uploadLink = createUploadLink({
  uri: env.VITE_GRAPHQL_API,
  headers: { "Apollo-Require-Preflight": "ok" },
  credentials: "include",
})

export const apolloClient = new ApolloClient({
  link: from([onAuthError, uploadLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge<T>(_existing: T[] = [], incoming: T[]): T[] {
              return [...incoming]
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
    query: { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-first" },
  },
  connectToDevTools: import.meta.env.DEV,
})
