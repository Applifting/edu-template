export const quackKeys = {
  all: () => ["quacks"] as const,
  lists: () => [...quackKeys.all(), "list"] as const,
  byUser: (username: string) => [...quackKeys.all(), "byUser", username] as const,
}
