<script setup lang="ts">
import { XVirtualList } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import DynamicHeightDemoCode from './dynamicHeight.vue?raw'
import DynamicHeightDemo from './dynamicHeight.vue'

const title = 'VirtualList'
const description = 'VirtualList is a component that allows you to render a list of items in a virtualized way. It is a high-performance component that is used to render large lists of items.'
const components = [XVirtualList]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Dynamic Height',
  description: '',
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
