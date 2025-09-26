import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// GitHub Pages 在專案子路徑下提供靜態檔案，因此 build 階段要輸出相對路徑
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [vue()],
}))
