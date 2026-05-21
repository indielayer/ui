<script setup lang="ts">
import { ref } from 'vue'

const colorMode = ref('light')

try {
  const storedMode = localStorage.getItem('color-mode')

  if (storedMode) {
    colorMode.value = storedMode
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      colorMode.value = 'dark'
    }
  }
} catch (e) {
  colorMode.value = 'light'
}

updateMode()

function toggle() {
  colorMode.value = (colorMode.value === 'light') ? 'dark' : 'light'

  updateMode()

  try {
    localStorage.setItem('color-mode', colorMode.value)
  } catch (e) {
    colorMode.value = 'light'
  }
}

function updateMode() {
  colorMode.value === 'light'
    ? document.querySelector('html')?.classList.remove('dark')
    : document.querySelector('html')?.classList.add('dark')
}
</script>

<template>
  <x-button
    ghost
    size="sm"
    class="-ml-2"
    :icon-left="colorMode === 'light' ? 'sun' : 'moon'"
    @click="toggle"
  />
</template>
