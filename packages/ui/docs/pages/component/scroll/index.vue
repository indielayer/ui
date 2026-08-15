<script setup lang="ts">
import { XScroll } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import HorizontalDemoCode from './horizontal.vue?raw'
import HorizontalDemo from './horizontal.vue'

const title = 'Scroll'
const description = 'Scroll container with optional edge shadows that hint at more content. Use Scroll for overflow lists and panels that scroll vertically or horizontally.'
const components = [XScroll]
const demos = [{
  name: 'Usage',
  description: 'Vertical scroll with edge shadow cues.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Horizontal',
  description: 'Horizontal scroll with edge shadow cues.',
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
