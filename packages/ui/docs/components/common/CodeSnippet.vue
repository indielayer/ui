<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHighlighter } from 'shiki'
import indielayerTheme from './Indielayer-theme.json'

const highlighter = getHighlighter({
  langs: ['js', 'ts', 'vue-html', 'bash', 'vue'],
})

const props = defineProps({
  code: String,
  lang: {
    type: String,
    default: 'vue',
  },
  showCopyButton: {
    type: Boolean,
    default: true,
  },
})

const highlighted = ref('')

onMounted(async () => {
  await (await highlighter).loadTheme(indielayerTheme as any)
  highlighted.value = (await highlighter).codeToHtml(props.code, { lang: props.lang, theme: 'Indielayer' })
})
</script>

<template>
  <div class="relative">
    <div v-html="highlighted"></div>
    <copy-button v-if="showCopyButton" class="!absolute top-2 right-2" :text="code"/>
  </div>
</template>

<style lang="postcss">
.shiki {
  @apply rounded-md overflow-x-auto p-4 text-sm;

  code { font-family: "Fira Code", monospace; }

  @supports (font-variation-settings: normal) {
    code { font-family: "Fira Code VF", monospace; }
  }
}
</style>
