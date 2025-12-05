<script setup>
import favicon from '../assets/favicon2.png'  //

defineProps({
  title: { type: String, default: '關於我' },
  intro: { type: String, default: '' },
  highlights: { type: Array, default: () => [] },
  /** 傳圖片路徑即可，自動裁成圓形；不傳時顯示 "image" 文字 */
  photo: { type: String, default: '' },
})
</script>
<template>
  <!-- 奶油米底 + 裝飾圓 -->
  <section id="about" class="w-full bg-[#FAF6ED] relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28">
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10 py-[5%] sm:py-[6%] lg:py-[8%] relative z-10 px-[5%] sm:px-[8%] lg:px-[10%]">

      <!-- 左側：標題／橫線／內文／亮點 -->
      <div>


        <h2 class="text-[#9B5D1E] font-extrabold tracking-wide text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
          {{ title }}
        </h2>

        <div class="mt-6 h-[3px] w-[72%] max-w-[300px] rounded-full
                    bg-gradient-to-r from-[#E5B07A] via-[#E29854] to-transparent"></div>

        <p v-if="intro" class="mt-10 text-lg leading-relaxed text-neutral-800 max-w-3xl">
          {{ intro }}
        </p>

        <ul v-if="highlights?.length" class="mt-6 list-disc pl-5 space-y-1 text-neutral-800">
          <li v-for="h in highlights" :key="h">{{ h }}</li>
        </ul>
      </div>

      <!-- 右側：圓形圖片（未提供就顯示 placeholder） -->
      <div class="flex justify-center lg:justify-end mt-8 lg:mt-0">
        <div
          class="relative w-[240px] sm:w-[280px] md:w-[340px] lg:w-[420px] xl:w-[520px] aspect-square
                 rounded-full overflow-hidden bg-white/60
                 ring-[3px] ring-[#E29854] shadow-[6px_6px_0_0_#E5B07A]
                 mr-0 lg:mr-[-40px] xl:mr-[-72px]"  ><!-- 響應式：小螢幕不推出，大螢幕往右推 -->
        
          <img
            :src="photo || favicon"
            alt="我的照片"
            class="w-full h-full object-cover rounded-full"
          />
         <!--<div v-else class="w-full h-full flex items-center justify-center text-3xl text-red-500/70 select-none">image</div>-->
        </div>
      </div>
    </div>

    <!-- 裝飾圓 - 保留動畫效果，確保動畫範圍內完整顯示 -->
    <div class="pointer-events-none absolute -right-8 -top-5 w-[12vw] h-[12vw] max-w-[150px] max-h-[150px] min-w-[80px] min-h-[80px] rounded-full bg-[#DDC692] ring-2 ring-neutral-300/50 bounce-in-ball"></div>
    <div class="pointer-events-none absolute left-[8%] top-[35%] w-[8vw] h-[8vw] max-w-[100px] max-h-[100px] min-w-[60px] min-h-[60px] rounded-full ring-2 ring-neutral-300/60"></div>
  </section>
</template>

