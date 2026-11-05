<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { BaseTheme, CarbonTheme, colors, type UITheme } from '@indielayer/ui'
import {
  applyDocsPalette,
  getSecondaryThemePalette,
  primaryPaletteKeys,
  secondaryPaletteKeys,
  type PrimaryPaletteKey,
  type SecondaryPaletteKey,
} from './utils/docsPalette'

const themes = [BaseTheme, CarbonTheme]

function readStored(key: string) {
  if (import.meta.env.SSR || typeof localStorage === 'undefined') return ''

  try {
    return localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

function writeStored(key: string, value: string) {
  if (import.meta.env.SSR || typeof localStorage === 'undefined') return

  try {
    localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

const themeName = ref(readStored('THEME') || BaseTheme.name || 'Base')

const storedPrimary = readStored('DOCS_PRIMARY')
const storedSecondary = readStored('DOCS_SECONDARY')
const primaryKey = ref<PrimaryPaletteKey>(
  (primaryPaletteKeys as readonly string[]).includes(storedPrimary)
    ? storedPrimary as PrimaryPaletteKey
    : 'emerald',
)
const secondaryKey = ref<SecondaryPaletteKey>(
  (secondaryPaletteKeys as readonly string[]).includes(storedSecondary)
    ? storedSecondary as SecondaryPaletteKey
    : 'slate',
)

const baseTheme = computed(() => themes.find((t) => t.name === themeName.value) || BaseTheme)

const theme = computed<UITheme>(() => ({
  ...baseTheme.value,
  colors: {
    ...baseTheme.value.colors,
    primary: colors[primaryKey.value],
    secondary: getSecondaryThemePalette(secondaryKey.value),
  },
}))

function syncPaletteCss() {
  applyDocsPalette({
    primary: colors[primaryKey.value],
    secondaryKey: secondaryKey.value,
  })
}

provide('selectTheme', {
  theme,
  themes,
  setTheme(key: string) {
    themeName.value = key
    writeStored('THEME', key)
  },
})

provide('docsPalette', {
  primaryKey,
  secondaryKey,
  setPrimary(key: PrimaryPaletteKey) {
    primaryKey.value = key
    writeStored('DOCS_PRIMARY', key)
  },
  setSecondary(key: SecondaryPaletteKey) {
    secondaryKey.value = key
    writeStored('DOCS_SECONDARY', key)
  },
})

watch([primaryKey, secondaryKey, themeName], syncPaletteCss, { immediate: false })

onMounted(() => {
  syncPaletteCss()
})
</script>

<template>
  <x-theme-provider :theme="theme">
    <router-view />
  </x-theme-provider>
</template>
