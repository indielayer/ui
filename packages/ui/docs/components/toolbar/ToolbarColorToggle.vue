<script setup lang="ts">
import { onMounted, ref } from 'vue'

const colorMode = ref('light')

function updateMode() {
  if (typeof document === 'undefined') return

  colorMode.value === 'light'
    ? document.querySelector('html')?.classList.remove('dark')
    : document.querySelector('html')?.classList.add('dark')
}

function readInitialMode() {
  if (import.meta.env.SSR || typeof localStorage === 'undefined') return 'light'

  try {
    const storedMode = localStorage.getItem('color-mode')

    if (storedMode) return storedMode

    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  } catch {
    // ignore
  }

  return 'light'
}

onMounted(() => {
  colorMode.value = readInitialMode()
  updateMode()
})

function toggle() {
  colorMode.value = (colorMode.value === 'light') ? 'dark' : 'light'

  updateMode()

  if (import.meta.env.SSR || typeof localStorage === 'undefined') return

  try {
    localStorage.setItem('color-mode', colorMode.value)
  } catch {
    colorMode.value = 'light'
  }
}
</script>

<template>
  <x-button
    ghost
    size="xs"
    class="-ml-2"
    :icon-left="colorMode === 'light' ? 'sun' : 'moon'"
    @click="toggle"
  />
</template>
