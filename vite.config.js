import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => {
  // Allow overriding the base at build time with the BASE_URL env var.
  // If not provided, default to the repo subpath for GitHub Pages.
  const envBase = process.env.BASE_URL
  const defaultBase = command === 'build' ? '/personalpractice/' : '/'

  return {
    base: envBase !== undefined ? envBase : defaultBase,
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: 'index.html',
        output: {
          // cache-busting
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  }
})
