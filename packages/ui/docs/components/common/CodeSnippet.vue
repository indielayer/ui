<script setup lang="ts">
import { ref, watch } from 'vue'
import { docsHighlighter, INDIELAYER_THEME } from '../../utils/shikiHighlighter'

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

async function updateHighlight() {
  const highlighter = await docsHighlighter

  highlighted.value = highlighter.codeToHtml(props.code ?? '', {
    lang: props.lang,
    theme: INDIELAYER_THEME,
  })
}

watch(
  () => [props.code, props.lang] as const,
  updateHighlight,
  { immediate: true },
)
</script>

<template>
  <div class="relative">
    <div v-html="highlighted"></div>
    <copy-button v-if="showCopyButton" class="absolute! top-2 right-2" :text="code"/>
  </div>
</template>

<style>
.shiki {
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  line-height: var(--text-sm--line-height);
  overflow-x: auto;
  padding: 1rem;
}

.shiki code {
  font-family: "Fira Code", monospace;
}

@supports (font-variation-settings: normal) {
  .shiki code {
    font-family: "Fira Code VF", monospace;
  }
}
</style>
