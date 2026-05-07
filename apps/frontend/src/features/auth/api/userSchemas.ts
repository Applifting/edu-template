import { z } from "zod"

export const userRoleSchema = z.enum(["admin", "user"])

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
  profileImageUrl: z.string().nullish(),
  role: userRoleSchema,
})

export type User = z.infer<typeof userSchema>
