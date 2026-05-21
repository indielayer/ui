<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { version } from '@indielayer/ui'
import ComponentsIndex from '../../search/components.json'
import ExampleBlocks from './ExampleBlocks.vue'

const componentCount = ComponentsIndex.length

const panelRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const tiltX = ref(5)
const tiltY = ref(-8)
const prefersReducedMotion = ref(false)

const REST_TILT_X = 5
const REST_TILT_Y = -8
const MAX_TILT_X = 10
const MAX_TILT_Y = 14

const panelTransform = computed(() => {
  if (prefersReducedMotion.value) return undefined

  return `perspective(1200px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg)`
})

let motionQuery: MediaQueryList | null = null

function onMotionPreferenceChange(event: MediaQueryListEvent) {
  prefersReducedMotion.value = event.matches
}

function updateTiltFromPointer(event: PointerEvent) {
  if (!panelRef.value || prefersReducedMotion.value) return

  const rect = panelRef.value.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  tiltY.value = x * MAX_TILT_Y
  tiltX.value = -y * MAX_TILT_X
}

function onPanelEnter() {
  if (prefersReducedMotion.value) return

  isHovering.value = true
  tiltX.value = 0
  tiltY.value = 0
}

function onPanelMove(event: PointerEvent) {
  if (!isHovering.value) return

  updateTiltFromPointer(event)
}

function onPanelLeave() {
  isHovering.value = false
  tiltX.value = REST_TILT_X
  tiltY.value = REST_TILT_Y
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionPreferenceChange)
})

onUnmounted(() => {
  motionQuery?.removeEventListener('change', onMotionPreferenceChange)
})

function scrollToInstallation() {
  const el = document.getElementById('installation')
  const main = document.getElementById('main')

  if (el && main) {
    main.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="docs-hero relative mb-6 -mt-2 -mx-4 lg:-mx-8 px-4 lg:px-8">
    <div class="docs-container grid lg:grid-cols-2 gap-10 lg:gap-8 items-center pb-10 lg:pb-14">
      <div class="min-w-0">
        <div class="flex items-center gap-4 mb-8">
          <img
            src="@/assets/images/logo_mini.svg"
            width="52"
            height="49"
            alt=""
            class="shrink-0 drop-shadow-sm"
          />
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Indielayer UI</span>
              <x-tag size="xs" color="primary" filled rounded>v{{ version }}</x-tag>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 m-0 mt-0.5">Vue 3 component library</p>
          </div>
        </div>

        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5 max-w-xl">
          Composable UI blocks for modern Vue apps
        </h1>

        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed m-0">
          Accessible, themeable building blocks for Vue 3. Prototype production-quality UIs without rebuilding the basics.
        </p>

        <div class="flex flex-wrap items-center gap-6 mb-8 text-base">
          <div class="flex items-center">
            <x-icon icon="vue" size="xl"/>
            <div class="ml-2">
              <div class="font-semibold text-gray-900 dark:text-white">Vue.js 3</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Performant UI</div>
            </div>
          </div>
          <x-divider vertical class="!h-5 hidden sm:block"/>
          <div class="flex items-center">
            <x-icon icon="nuxt" size="xl"/>
            <div class="ml-2">
              <div class="font-semibold text-gray-900 dark:text-white">Nuxt.js 3</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">SSR Ready</div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
          <x-button color="primary" to="/component/button" icon-right="arrow-right">
            Browse components
          </x-button>
          <x-button outlined icon="book" @click="scrollToInstallation">
            Installation
          </x-button>
          <x-button ghost icon="github" href="https://github.com/indielayer/ui" target="_blank">GitHub</x-button>
        </div>

        <div class="flex flex-wrap gap-2">
          <x-tag size="sm" outlined rounded>{{ componentCount }}+ components</x-tag>
          <x-tag size="sm" outlined rounded>Vue 3</x-tag>
          <x-tag size="sm" outlined rounded>Nuxt 3</x-tag>
          <x-tag size="sm" outlined rounded>Tailwind CSS 3</x-tag>
        </div>
      </div>

      <div
        class="docs-hero__panel hidden lg:block w-full min-w-0"
        :class="{ 'docs-hero__panel--hover': isHovering }"
      >
        <div
          ref="panelRef"
          class="docs-hero__panel-tilt"
          :style="{ transform: panelTransform }"
          @pointerenter="onPanelEnter"
          @pointermove="onPanelMove"
          @pointerleave="onPanelLeave"
        >
          <div class="docs-hero__panel-surface rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60 dark:border-gray-700 dark:bg-gray-950 dark:shadow-2xl dark:shadow-primary-500/10 max-h-[640px] overflow-y-auto p-6">
            <example-blocks />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.docs-hero {
  background: radial-gradient(50% 100% at 25% 100%, #f8fafc 0%, rgba(248, 250, 252, 0) 100%);
}

html.dark .docs-hero {
  background: radial-gradient(50% 100% at 25% 100%, rgb(16 185 129 / 16%) 0%, rgba(248, 250, 252, 0) 100%);
}

.docs-hero__panel:not(.docs-hero__panel--hover) {
  animation: docs-hero-float 6s ease-in-out infinite;
}

.docs-hero__panel--hover {
  animation: none;
}

.docs-hero__panel-tilt {
  transform-style: preserve-3d;
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.docs-hero__panel-surface {
  transform: translateZ(0);
}

@keyframes docs-hero-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .docs-hero__panel {
    animation: none;
  }

  .docs-hero__panel-tilt {
    transition: none;
  }
}
</style>
