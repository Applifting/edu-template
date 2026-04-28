#!/usr/bin/env node
import "dotenv-flow/config"

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  buildClientSchema,
  getIntrospectionQuery,
  lexicographicSortSchema,
  printSchema,
} from "graphql"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const VITE_GRAPHQL_API = process.env.VITE_GRAPHQL_API
const SCHEMA_FILE_PATH = path.resolve(__dirname, "../schema.graphql")

if (!VITE_GRAPHQL_API) {
  console.error("error: `VITE_GRAPHQL_API` env variable not defined")
  process.exit(1)
}

async function saveSchema(endpoint, filename) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
  const json = await response.json()
  const sortedSchema = lexicographicSortSchema(buildClientSchema(json.data))
  fs.writeFileSync(filename, printSchema(sortedSchema))
}

console.log("⌛ Downloading GraphQL schema...")
await saveSchema(VITE_GRAPHQL_API, SCHEMA_FILE_PATH)
console.log("✅ GraphQL schema downloaded.")
