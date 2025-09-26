import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/personalpractice/' : '/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        // 自動加 hash，避免快取舊檔案
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}))
