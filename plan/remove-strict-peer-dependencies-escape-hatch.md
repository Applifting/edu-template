# Remove `strict-peer-dependencies=false` from `.npmrc`

## Context

During the yarn → pnpm migration we set `strict-peer-dependencies=false` in
`.npmrc` because the initial `pnpm install` produced ~20 `unmet peer` errors
from old `@graphql-tools/*` v6 packages and `@graphql-inspector/graphql-cli-common`
in the frontend dependency tree. They declare a peer range of
`graphql@^14.0.0 || ^15.0.0`, but the project uses `graphql@16`. Yarn 1 was
silently tolerating the same warnings; pnpm under default settings would either
fail the install or duplicate packages to try to satisfy the conflicting peer
demands.

The flag was the smallest change that let the migration land. It is a temporary
escape hatch, not a long-term setting.

## Why we should remove it

- pnpm's default (`strict-peer-dependencies=true`) is the safer behavior. It
  catches real version conflicts that lead to duplicated transitive packages,
  which in turn cause subtle "two copies of the same library" type errors (we
  already hit this kind of issue with `zod` and `better-auth` during the
  migration).
- Suppressing peer warnings repo-wide hides genuine problems alongside the
  noisy ones. The `graphql` peer mismatches are known and benign; future
  mismatches in unrelated packages would be harder to spot.
- `.npmrc` is meant to be small and intentional. Each line is a behavioral
  override that future contributors have to reason about.

## What to do when revisiting

1. Run `pnpm why graphql` from the repo root and confirm whether the v6
   `@graphql-tools/*` chain is still in the dependency tree.
2. If yes — most likely path — identify the top-level package pulling it in.
   Check `frontend/package.json`. The current suspect is
   `@graphql-inspector/graphql-cli-common`, which is itself a transitive
   dependency of `@graphql-codegen/cli`.
3. Either:

   - Upgrade the offending top-level package to a version whose transitive
     graph no longer includes the v6 `@graphql-tools/*` chain, or
   - Add a targeted `pnpm.peerDependencyRules.allowedVersions` entry in the
     root `package.json` that whitelists `graphql@16` for the specific old
     packages, which is more precise than the global flag, e.g.:

     ```json
     "pnpm": {
       "peerDependencyRules": {
         "allowedVersions": {
           "@graphql-tools/utils>graphql": "16",
           "@graphql-tools/schema>graphql": "16"
         }
       }
     }
     ```

4. Remove the `strict-peer-dependencies=false` line from `.npmrc`.
5. Run a clean install (`rm -rf node_modules **/node_modules && pnpm install`)
   and confirm there are no unmet peer errors and the existing checks still
   pass: `pnpm check-all`, `pnpm --filter backend seed`,
   `pnpm --filter frontend build:vite`.

## When to revisit

Tie this to the next time someone touches the GraphQL codegen or
`@graphql-inspector` setup, or as a standalone follow-up issue once the rest
of the pnpm migration (Docker, CI) has settled.
