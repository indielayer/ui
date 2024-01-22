<script lang="ts">
export default { name: 'XThemeProvider' }
</script>

<script setup lang="ts">
import { watchEffect, ref, inject, provide, type PropType, unref } from 'vue'
import { injectThemeKey } from '../../composables/keys'
import { injectThemeStyles, type UITheme } from '../../theme'

const props = defineProps({
  theme: Object as PropType<UITheme>,
})

const initialTheme = inject(injectThemeKey, {})
const theme = ref<UITheme>(props.theme || unref(initialTheme) || {})

provide(injectThemeKey, theme)

watchEffect(() => {
  theme.value = props.theme || unref(initialTheme) || {}

  if (theme.value.styles) injectThemeStyles(theme.value.name || '', theme.value.styles)
})
</script>

<template>
  <slot></slot>
</template>
