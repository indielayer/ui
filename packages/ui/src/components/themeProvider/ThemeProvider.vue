<script lang="ts">
import type { PropType } from 'vue'
import type { UITheme } from '../../theme'

const themeProviderProps = {
  theme: {
    type: Object as PropType<UITheme>,
    description: 'Theme object provided to descendant components.',
  },
}

export default {
  name: 'XThemeProvider',
  docs: {
    slots: {
      default: 'Content that receives the provided theme.',
    },
  },
}
</script>

<script setup lang="ts">
import { watchEffect, ref, inject, provide, unref } from 'vue'
import { injectThemeKey } from '../../composables/keys'
import { injectThemeStyles } from '../../theme'

const props = defineProps(themeProviderProps)

const initialTheme = inject(injectThemeKey, {})
const theme = ref(props.theme || unref(initialTheme) || {})

provide(injectThemeKey, theme)

watchEffect(() => {
  theme.value = props.theme || unref(initialTheme) || {}

  if (theme.value.styles) injectThemeStyles(theme.value.name || '', theme.value.styles)
})
</script>

<template>
  <slot></slot>
</template>
