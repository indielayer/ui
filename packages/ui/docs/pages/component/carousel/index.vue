<script setup lang="ts">
import { XCarousel } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Carousel'
const description = 'A sliding viewport for cycling through images or content panels. Use carousels for galleries and featured items when horizontal space is limited.'
const components = [XCarousel]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'card'
const next = 'container'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/carousel"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
