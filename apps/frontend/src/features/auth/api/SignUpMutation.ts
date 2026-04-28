import type { TypedDocumentNode } from "@apollo/client"
import type { ResultOf, VariablesOf } from "@graphql-typed-document-node/core"

import { gql } from "@/gql"

export type SignUpInputType = {
  email: string
  password: string
  name: string
  username: string
  profilePicture?: File
}

export type SignUpMutationData = {
  signUp: {
    id: string
    name: string
    email: string
    username: string
    profileImageUrl?: string
    role: string
  }
}

export const SignUpMutation = gql(/* GraphQL */ `
  mutation SignUp($data: SignUpInputType!) {
    signUp(data: $data) {
      id
      name
      email
      username
      profileImageUrl
      role
    }
  }
`) as unknown as TypedDocumentNode<SignUpMutationData, { data: SignUpInputType }>

export type SignUpMutationResult = ResultOf<typeof SignUpMutation>
export type SignUpMutationVariables = VariablesOf<typeof SignUpMutation>
