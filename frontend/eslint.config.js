import { tsRouterConfig } from "@workspace/eslint-config/tanstack-router"

export default [
  {
    ignores: [
      "build/**",
      "dist/**",
      "src/routeTree.gen.ts",
      "src/gql/**",
      // Vendored shadcn/ui primitives follow upstream conventions
      // (default React import, interface for props) that diverge from
      // the project's lint rules.
      "src/components/ui/**",
    ],
  },
  ...tsRouterConfig,
]
