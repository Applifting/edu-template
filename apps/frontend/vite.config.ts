/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { checker } from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_")

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
      tsconfigPaths({ projects: ["tsconfig.json"] }),
      svgr(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: "eslint './src/**/*.{ts,tsx,js,cjs,mjs}'",
        },
        overlay: { initialIsOpen: false },
      }),
    ],
    server: {
      port: 3000,
      proxy: { "/uploads": { target: env.VITE_UPLOADS, changeOrigin: true } },
      allowedHosts: env.VITE_ALLOWED_HOSTS ? env.VITE_ALLOWED_HOSTS.split(",") : [],
    },
    build: { outDir: "build", copyPublicDir: false },
  }
})
