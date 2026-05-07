import { api } from "@/lib/api-client"

import { userSchema, type User } from "@/features/auth/api/userSchemas"

export type SignUpInput = {
  email: string
  password: string
  name: string
  username: string
  profileImage?: File | null
}

export async function signUp(input: SignUpInput): Promise<User> {
  const body = new FormData()
  body.set("email", input.email)
  body.set("password", input.password)
  body.set("name", input.name)
  body.set("username", input.username)
  if (input.profileImage) {
    body.set("profilePicture", input.profileImage)
  }
  const json = await api.post("users/sign-up", { body }).json()
  return userSchema.parse(json)
}
