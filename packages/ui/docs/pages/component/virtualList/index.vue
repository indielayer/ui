<script setup lang="ts">
import { XVirtualList } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import DynamicHeightDemoCode from './dynamicHeight.vue?raw'
import DynamicHeightDemo from './dynamicHeight.vue'

const title = 'VirtualList'
const description = 'Renders only visible rows of a long list for better scroll performance. Use VirtualList for feeds and catalogs with thousands of items.'
const components = [XVirtualList]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Dynamic Height',
  description: 'Rows with variable heights while scrolling.',
  code: DynamicHeightDemoCode,
  component: DynamicHeightDemo,
}]
const back = ''
const next = ''
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/virtualList"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
