import { tsRouterConfig } from "@workspace/eslint-config/tanstack-router"

export default [
  ...tsRouterConfig,
  {
    ignores: ["build/**", "dist/**", "src/routeTree.gen.ts", "src/gql/**"],
  },
]
