export const userKeys = {
  all: () => ["users"] as const,
  detail: (username: string) => [...userKeys.all(), "detail", username] as const,
}
