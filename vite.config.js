import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// GitHub Pages 在專案子路徑下提供靜態檔案，因此 build 階段要輸出相對路徑
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/personalpractice/' : '/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        // 讓 Vite 自動產生帶 hash 的檔案名稱，避免快取
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
}))
