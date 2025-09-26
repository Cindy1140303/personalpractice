# Portfolio (Vue 3 + Tailwind + Vite)

A clean, Notion-inspired portfolio scaffold.

## 使用方式

```bash
# 1) 安裝相依套件
npm install

# 2) 開發模式
npm run dev

# 3) 打包
npm run build
npm run preview
```

## 編輯內容
- 主要文案在 `src/data/site.js`。
- 版型在 `src/App.vue` 與 `src/components/*`。
- Tailwind 樣式在 `src/assets/main.css` 與 `tailwind.config.js`。

> 聯絡表單目前為前端示範，實務上可串接：Formspree、Netlify Forms、Supabase、Django API 等。

## GitHub Pages 部署

- 調整任何 Vue 元件、CSS、Tailwind 設定或靜態資源後，請重新執行 `npm run build` 產生最新的 `dist/`。
- 部署到 GitHub Pages 時，確保發佈的是 `dist/` 目錄（例如執行 `npm run deploy` 或手動上傳其內容）。
- 若發現頁面仍載入舊的樣式或發生 404，先清除快取或再次部署最新的 `dist/` 檔案。
