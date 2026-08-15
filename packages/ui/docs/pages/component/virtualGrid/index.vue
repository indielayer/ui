<script setup lang="ts">
import { XVirtualGrid } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'VirtualGrid'
const description = 'Renders only visible cells of a large grid for better scroll performance. Use VirtualGrid when a dense grid would be too heavy to mount all at once.'
const components = [XVirtualGrid]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'virtualList'
const next = ''
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/virtualGrid"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
