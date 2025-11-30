<script setup>
import Navbar from './components/Navbar.vue'
import AboutIntro from './components/AboutIntro.vue'
import ProjectCard from './components/ProjectCard.vue'
import Footer from './components/Footer.vue'
import { site } from './data/site'
import { ref, onMounted } from 'vue'
import formIcon from './assets/form-icon.png'
import lineIcon from './assets/line-icon.png'

// Projects 配色
const projectColors = ['#BA8A4D', '#283926', '#111111']

// Skills 動畫
const displaySkills = ref([])
onMounted(() => {
  displaySkills.value = []
  site.skills.forEach((s, idx) => {
    setTimeout(() => displaySkills.value.push(s), idx * 120)
  })
})

// 聯絡我互動狀態
const activeIndex = ref(null)   // hover 中的元素
const pressedIndex = ref(null)  // 按下的元素

function hoverItem(index) {
  activeIndex.value = index
}
function leaveItem(index) {
  if (activeIndex.value === index) activeIndex.value = null
}
function pressItem(index) {
  pressedIndex.value = index
}
function releaseItem(index) {
  pressedIndex.value = null
}
</script>

<template>
  <div>
    <Navbar />

    <AboutIntro
      title="關於我"
      :intro="site.about.intro"
      :highlights="site.about.highlights"
      :photo="site.about.photo || ''"
    />

    <!-- Projects -->
    <section id="projects" class="w-full bg-[#EFE6DD] overflow-hidden">
      <div class="w-full px-[5%] sm:px-[8%] lg:px-[10%] py-[5%] sm:py-[6%] lg:py-[8%]">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-[#9B5D1E]">
            專案展示
          </h2>
        </div>
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center w-full">
            <ProjectCard
              v-for="(p, i) in site.projects"
              :key="p.title"
              :project="p"
              :bg="p.bg || projectColors[i % projectColors.length]"
            />
          
        </section> 
      </div>
    </section>
     <!-- 經歷 Experience -->
    <section id="experience" class="w-full overflow-hidden">
      <div class="w-full px-[5%] sm:px-[8%] lg:px-[10%] py-[5%] sm:py-[6%] lg:py-[8%]">
          <!-- 標題區 -->
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-[#000000]">
                經驗
          </h2>
        </div>
      
      <!-- 桌面版：水平時間軸（只在超大螢幕顯示） -->
      <ol class="relative hidden xl:flex items-center justify-between py-8 xl:py-16">
        <!-- 中央水平線 -->
        <span class="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-neutral-200 z-0"></span>

        <li
          v-for="(e, idx) in site.experience"
          :key="e.title"
          class="relative flex-1 flex justify-center"
        >
          <!-- 圓點 -->
          <span
            class="pointer-events-none absolute top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-primary-400 rounded-full ring-4 ring-primary-100"
          ></span>

          <!-- 內容（左右在上、中央在下） -->
          <div
            :class="[
              'relative z-10 w-[280px] max-w-[90vw] text-center transition-all duration-300',
              idx % 2 === 0 ? 'mb-20 pb-20' : 'mt-20 pt-20'
            ]"
          >
            <h3 class="text-xl font-semibold tracking-wide">{{ e.title }}</h3>
            <time class="block text-sm text-neutral-500 mt-1">{{ e.time }}</time>
            <p class="mt-2 text-neutral-700">{{ e.detail }}</p>
          </div>
        </li>
      </ol>

      <!-- 中小螢幕：垂直時間軸 -->
      <ol class="xl:hidden relative space-y-6 sm:space-y-8 border-l-2 border-neutral-200 pl-4 sm:pl-6 ml-3 sm:ml-4">
        <li v-for="(e, idx) in site.experience" :key="e.title" class="relative">
          <span class="absolute -left-[21px] sm:-left-[29px] w-3 h-3 sm:w-4 sm:h-4 bg-primary-400 rounded-full ring-3 sm:ring-4 ring-primary-100"></span>
          <time class="block text-xs sm:text-sm text-neutral-500 mb-1">{{ e.time }}</time>
          <h3 class="text-base sm:text-lg font-semibold tracking-wide">{{ e.title }}</h3>
          <p class="mt-1 sm:mt-2 text-neutral-700 text-sm sm:text-base">{{ e.detail }}</p>
        </li>
      </ol>
      </div>
    </section>


    <!-- Skills -->
    <section id="skills" class="w-full overflow-hidden">
      <div class="w-full px-[5%] sm:px-[8%] lg:px-[10%] py-[5%] sm:py-[6%] lg:py-[10%] min-h-[300px] sm:min-h-[400px]">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider text-[#9B5D1E]">
            技能
          </h2>
        </div>
        <div class="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 justify-center">
          <transition-group name="skill-fade" tag="div" class="flex flex-wrap gap-6">
            <span
              v-for="(s, idx) in displaySkills"
              :key="s"
              class="tag transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
              :style="{ transitionDelay: (idx * 80) + 'ms' }"
            >
              {{ s }}
            </span>
          </transition-group>
        </div>
      </div>
    </section>

    <!-- ✅ 聯絡我 (直接整合你的程式) -->
    <section id="contact" class="w-full overflow-hidden">
      <div class="w-full px-[5%] sm:px-[8%] lg:px-[10%] py-[5%] sm:py-[6%] lg:py-[8%]">
        <div class="flex flex-wrap justify-center gap-6 sm:gap-8">
      <!-- 設計諮詢 -->
      <div
        class="contact-item text-center max-w-[200px]"
        @mouseenter="hoverItem(0)"
        @mouseleave="leaveItem(0)"
        @mousedown="pressItem(0)"
        @mouseup="releaseItem(0)"
        @touchstart.prevent="pressItem(0)"
        @touchend.prevent="releaseItem(0)"
      >
        <div
          class="icon-wrapper flex justify-center items-center mx-auto mb-4 rounded-full w-28 h-28 shadow-md transition-all duration-300"
          :class="{ 'bg-[#fffaf5] shadow-lg scale-105': activeIndex === 0 }"
        >
          <button
            class="bg-[#b37550] hover:bg-[#8c5a3d] text-white px-4 py-2 rounded-full transition-transform duration-300"
            :class="{ 'scale-90': pressedIndex === 0, 'scale-110': activeIndex === 0 && pressedIndex === null }"
          >
            設計諮詢
          </button>
        </div>
        <p>點選 <span class="text-[#b37550] font-bold">諮詢設計</span></p>
      </div>

      <!-- 加入LINE官方 -->
      <div
        class="contact-item text-center max-w-[200px]"
        @mouseenter="hoverItem(1)"
        @mouseleave="leaveItem(1)"
        @mousedown="pressItem(1)"
        @mouseup="releaseItem(1)"
        @touchstart.prevent="pressItem(1)"
        @touchend.prevent="releaseItem(1)"
      >
        <div
          class="icon-wrapper flex justify-center items-center mx-auto mb-4 rounded-full w-28 h-28 shadow-md transition-all duration-300"
          :class="{ 'bg-[#fffaf5] shadow-lg scale-105': activeIndex === 1 }"
        >
          <img :src="lineIcon" alt="Line" class="transition-transform duration-300"/>
        </div>
        <p>
          加入
          <a
            href="https://line.me/ti/p/你的官方帳號"
            class="text-[#b37550] font-bold underline"
          >
            合作LINE官方
          </a>
        </p>
      </div>

      <!-- 填寫表單 -->
      <div
        class="contact-item text-center max-w-[200px]"
        @mouseenter="hoverItem(2)"
        @mouseleave="leaveItem(2)"
        @mousedown="pressItem(2)"
        @mouseup="releaseItem(2)"
        @touchstart.prevent="pressItem(2)"
        @touchend.prevent="releaseItem(2)"
      >
        <div
          class="icon-wrapper flex justify-center items-center mx-auto mb-4 rounded-full w-28 h-28 shadow-md transition-all duration-300"
          :class="{ 'bg-[#fffaf5] shadow-lg scale-105': activeIndex === 2 }"
        >
          <img :src="formIcon" alt="Form" class="transition-transform duration-300"/>
        </div>
        <p>
          填寫
          <a
            href="https://你的typeform連結"
            target="_blank"
            class="text-[#b37550] font-bold underline"
          >
            Typeform 表單
          </a>
        </p>
      </div>
      </div>
      </div>
    </section>

    <Footer />
  </div>
</template>
