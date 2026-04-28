import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          DateTime: "string",
          Upload: "File",
        },
      },
    },
  },
  ignoreNoDocuments: true,
  hooks: { afterAllFileWrite: ["prettier --write"] },
}

export default config
