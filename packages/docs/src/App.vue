<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'
import { BaseTheme, CarbonTheme } from '@indielayer/ui'

const lastTheme = localStorage.getItem('THEME') || ''

const themes = [BaseTheme, CarbonTheme]
const theme = ref(themes.find((t) => t.name === lastTheme) || BaseTheme)

provide('selectTheme', {
  theme,
  themes,
  setTheme(key: string) {
    theme.value = themes.find((t) => t.name === key) || BaseTheme
    localStorage.setItem('THEME', theme.value.name)
  },
})
</script>

<template>
  <x-theme-provider :theme="theme">
    <router-view />
  </x-theme-provider>
</template>
