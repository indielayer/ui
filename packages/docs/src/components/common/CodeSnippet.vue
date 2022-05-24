<template>
  <div class="hljs relative px-5 py-4">
    <highlightjs v-if="lang === 'javascript'" language="js" :code="code" />
    <pre v-else v-html="highlighted"></pre>
    <copy-button class="!absolute top-2 right-2" :text="code"/>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import '@/assets/css/hljs.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)

export default {
  components: {
    highlightjs: hljsVuePlugin.component,
  },
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
    },
  },
  computed: {
    highlighted() {
      return hljs.highlight(this.code, { language: this.lang }).value
    },
  },
}
</script>
