import { reactConfig } from "@workspace/prettier-config"

/** @type {import('prettier').Config} */
const config = {
  ...reactConfig,
  // Override path that pointed at the original turborepo package layout.
  tailwindStylesheet: "./src/styles/global.css",
}

export default config
