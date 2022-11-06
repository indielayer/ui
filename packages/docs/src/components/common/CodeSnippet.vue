<script lang="ts">
import { setCDN, getHighlighter } from 'shiki'
import theme from './Indielayer-theme.json'

setCDN('/shiki/')
  // // setCDN('/')
  // setCDN('https://cdn.jsdelivr.net/npm/shiki-es@0.10.1/dist/assets/')
  // setCDN(`-`)
  // setCDN('https://unpkg.com/shiki@')

  // const t = loadTheme('./Indielayer-theme.json')

  const highlighter = getHighlighter({
  // theme: 'nord',
    theme: 'indielayer',
    langs: [{
      id: 'ts',
      scopeName: 'source.ts',
      path: './languages/typescript.tmLanguage.json',
    }, {
      id: 'vue-html',
      scopeName: 'text.html.vue-html',
      path: './languages/vue-html.tmLanguage.json',
    }, {
      id: 'html',
      scopeName: 'text.html.basic',
      path: './languages/html.tmLanguage.json',
    }, {
      id: 'bash',
      scopeName: 'source.shell',
      path: './languages/shellscript.tmLanguage.json',
    }, {
      id: 'vue',
      scopeName: 'source.vue',
      path: './languages/vue.tmLanguage.json',
    }, {
      id: 'js',
      scopeName: 'source.js',
      path: './languages/javascript.tmLanguage.json',
    }],
  })

</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
  highlighted.value = (await highlighter).codeToHtml(props.code, { lang: props.lang })
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
  /* font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; */
  @apply rounded-md overflow-x-auto p-4 text-sm;

  code { font-family: 'Fira Code', monospace; }

  @supports (font-variation-settings: normal) {
    code { font-family: 'Fira Code VF', monospace; }
  }
}
</style>
