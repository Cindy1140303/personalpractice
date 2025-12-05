<template>
  <!-- 響應式導覽列：5種螢幕尺寸優化 -->
  <nav class="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
    <div class="w-full px-[3%] sm:px-[5%] md:px-[6%] lg:px-[8%] xl:px-[10%] flex items-center justify-between h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20">
      <!-- Logo/品牌名稱 - 響應式字體 -->
      <a 
        href="#top" 
        class="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl transition-all duration-300 hover:text-primary-600" 
        @click="active = '#top'">
        Cindy
      </a>

      <!-- 桌面/平板導覽 - 從 md (768px) 開始顯示 -->
      <div class="hidden md:flex gap-3 lg:gap-4 xl:gap-6 text-xs sm:text-sm md:text-base lg:text-lg">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="active = link.href"
          :aria-current="isActive(link.href) ? 'page' : undefined"
          :class="[
            'transition-all duration-300 py-1 px-2 rounded-md',
            isActive(link.href)
              ? 'text-primary-600 underline underline-offset-4 md:underline-offset-6 lg:underline-offset-8 font-semibold'
              : 'hover:text-primary-500 hover:bg-primary-50'
          ]">
          {{ link.label }}
        </a>
      </div>

      <!-- 手機/小平板選單按鈕 -->
      <button 
        @click="open = !open" 
        class="md:hidden p-1.5 sm:p-2 ring-1 ring-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors duration-300 text-xs sm:text-sm">
        {{ open ? '✕' : '☰' }}
      </button>
    </div>

    <!-- 手機/小平板下拉選單 -->
    <div 
      v-if="open" 
      class="md:hidden w-full px-[3%] sm:px-[5%] pb-3 sm:pb-4 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-lg">
      <div class="flex flex-col gap-1 sm:gap-2">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="active = link.href; open = false"
          :class="[
            'py-2 sm:py-3 px-3 border-b border-neutral-100 transition-all duration-300 rounded-md text-sm sm:text-base',
            isActive(link.href) 
              ? 'text-primary-600 bg-primary-50 font-semibold' 
              : 'hover:bg-neutral-50'
          ]">
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const active = ref('#top')
const links = [
  { label: '作品', href: '#projects' },
  { label: '經歷', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '聯絡', href: '#contact' },
]

const isActive = (href) => active.value === href
const setActiveFromHash = () => { active.value = window.location.hash || '#top' }

let observer

onMounted(() => {
  // 1) 依目前網址 hash 初始化
  setActiveFromHash()
  window.addEventListener('hashchange', setActiveFromHash)

  // 2) Scroll-Spy：偵測目前在畫面的區塊
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = `#${entry.target.id}`
        }
      })
    },
    // 讓區塊進到視窗中段就切換
    { rootMargin: '-45% 0px -55% 0px', threshold: [0, 0.2, 0.6, 1] }
  )

  const ids = ['top', 'projects', 'experience', 'skills', 'contact']
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', setActiveFromHash)
  if (observer) observer.disconnect()
})
</script>
