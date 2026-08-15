<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import { BaseTheme, CarbonTheme } from '@indielayer/ui'

const themes = [BaseTheme, CarbonTheme]

function readStoredTheme() {
  if (import.meta.env.SSR || typeof localStorage === 'undefined') return ''

  try {
    return localStorage.getItem('THEME') || ''
  } catch {
    return ''
  }
}

const theme = ref(themes.find((t) => t.name === readStoredTheme()) || BaseTheme)

provide('selectTheme', {
  theme,
  themes,
  setTheme(key: string) {
    theme.value = themes.find((t) => t.name === key) || BaseTheme
    if (import.meta.env.SSR || typeof localStorage === 'undefined') return

    try {
      localStorage.setItem('THEME', theme.value.name)
    } catch {
      // ignore
    }
  },
})
</script>

<template>
  <x-theme-provider :theme="theme">
    <router-view />
  </x-theme-provider>
</template>
