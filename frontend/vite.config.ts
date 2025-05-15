/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { env } from 'node:process';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: { '/uploads': { target: env.VITE_UPLOADS, changeOrigin: true } },
  },
  build: { outDir: 'build', copyPublicDir: false },
  resolve: {
    alias: {
      // These must be kept in sync with tsconfig.json!
      '@frontend': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, '../shared/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
