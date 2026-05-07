import { queryOptions } from "@tanstack/react-query"
import { HTTPError } from "ky"

import { api } from "@/lib/api-client"

import { userKeys } from "@/features/auth/api/userKeys"
import { userSchema, type User } from "@/features/auth/api/userSchemas"

export const userByUsernameQueryOptions = (username: string) =>
  queryOptions({
    queryKey: userKeys.detail(username),
    queryFn: async (): Promise<User | null> => {
      try {
        const json = await api.get(`users/${username}`).json()
        return userSchema.parse(json)
      } catch (error) {
        if (error instanceof HTTPError && error.response.status === 404) {
          return null
        }
        throw error
      }
    },
  })
