import type { ResultOf } from "@graphql-typed-document-node/core"

import { gql, type FragmentType } from "@/gql"

export const BaseQuackFragment = gql(/* GraphQL */ `
  fragment BaseQuack on Quack {
    id
    createdAt
    user {
      id
      name
      username
      profileImageUrl
    }
    text
  }
`)

export type BaseQuackFragmentType = FragmentType<typeof BaseQuackFragment>
export type BaseQuackResult = ResultOf<typeof BaseQuackFragment>
