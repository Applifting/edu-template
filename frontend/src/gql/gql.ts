/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        name\n        userName\n        profileImageUrl\n      }\n      token\n    }\n  }\n':
    types.SignInDocument,
  '\n  mutation SignUp(\n    $email: String!\n    $name: String!\n    $password: String!\n    $userName: String!\n    $profileImage: Upload\n  ) {\n    signUp(\n      email: $email\n      name: $name\n      password: $password\n      userName: $userName\n      profileImage: $profileImage\n    ) {\n      user {\n        id\n        name\n        userName\n        profileImageUrl\n      }\n      token\n    }\n  }\n':
    types.SignUpDocument,
  '\n  mutation AddQuack($text: String!) {\n    addQuack(text: $text) {\n      id\n    }\n  }\n':
    types.AddQuackDocument,
  '\n  fragment BaseQuack on Quack {\n    id\n    createdAt\n    user {\n      id\n      name\n      userName\n      profileImageUrl\n    }\n    text\n  }\n':
    types.BaseQuackFragmentDoc,
  '\n  fragment QuackUserDetail on User {\n    id\n    name\n    userName\n    profileImageUrl\n    quacks {\n      id\n      ...BaseQuack\n    }\n  }\n':
    types.QuackUserDetailFragmentDoc,
  '\n  query Quacks {\n    quacks {\n      id\n      ...BaseQuack\n    }\n  }\n':
    types.QuacksDocument,
  '\n  query UserDetail($userName: String!) {\n    user(userName: $userName) {\n      ...QuackUserDetail\n    }\n  }\n':
    types.UserDetailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        name\n        userName\n        profileImageUrl\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      user {\n        id\n        name\n        userName\n        profileImageUrl\n      }\n      token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation SignUp(\n    $email: String!\n    $name: String!\n    $password: String!\n    $userName: String!\n    $profileImage: Upload\n  ) {\n    signUp(\n      email: $email\n      name: $name\n      password: $password\n      userName: $userName\n      profileImage: $profileImage\n    ) {\n      user {\n        id\n        name\n        userName\n        profileImageUrl\n      }\n      token\n    }\n  }\n',
): (typeof documents)['\n  mutation SignUp(\n    $email: String!\n    $name: String!\n    $password: String!\n    $userName: String!\n    $profileImage: Upload\n  ) {\n    signUp(\n      email: $email\n      name: $name\n      password: $password\n      userName: $userName\n      profileImage: $profileImage\n    ) {\n      user {\n        id\n        name\n        userName\n        profileImageUrl\n      }\n      token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddQuack($text: String!) {\n    addQuack(text: $text) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation AddQuack($text: String!) {\n    addQuack(text: $text) {\n      id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment BaseQuack on Quack {\n    id\n    createdAt\n    user {\n      id\n      name\n      userName\n      profileImageUrl\n    }\n    text\n  }\n',
): (typeof documents)['\n  fragment BaseQuack on Quack {\n    id\n    createdAt\n    user {\n      id\n      name\n      userName\n      profileImageUrl\n    }\n    text\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment QuackUserDetail on User {\n    id\n    name\n    userName\n    profileImageUrl\n    quacks {\n      id\n      ...BaseQuack\n    }\n  }\n',
): (typeof documents)['\n  fragment QuackUserDetail on User {\n    id\n    name\n    userName\n    profileImageUrl\n    quacks {\n      id\n      ...BaseQuack\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query Quacks {\n    quacks {\n      id\n      ...BaseQuack\n    }\n  }\n',
): (typeof documents)['\n  query Quacks {\n    quacks {\n      id\n      ...BaseQuack\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query UserDetail($userName: String!) {\n    user(userName: $userName) {\n      ...QuackUserDetail\n    }\n  }\n',
): (typeof documents)['\n  query UserDetail($userName: String!) {\n    user(userName: $userName) {\n      ...QuackUserDetail\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
