import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
// Base path differs by hosting target:
// - Firebase Hosting / custom domain: '/'
// - GitHub Pages project site: '/<repo>/'
//
// Prefer explicit override for predictable builds.
const base =
  process.env.VITE_BASE ??
  (process.env.GITHUB_REPOSITORY_NAME
    ? `/${process.env.GITHUB_REPOSITORY_NAME}/`
    : '/')

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
