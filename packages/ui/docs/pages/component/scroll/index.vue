<script setup lang="ts">
import { XScroll } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import HorizontalDemoCode from './horizontal.vue?raw'
import HorizontalDemo from './horizontal.vue'

const title = 'Scroll'
const description = 'The Scroll component enhances scrolling experiences by adding visual cues, such as inner shadows, to indicate additional content. It is useful for horizontally or vertically scrolling lists and containers.'
const components = [XScroll]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Horizontal',
  description: '',
  code: HorizontalDemoCode,
  component: HorizontalDemo,
}]
const back = 'tooltip'
const next = 'spacer'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/scroll"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
