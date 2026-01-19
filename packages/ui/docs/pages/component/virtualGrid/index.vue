<script setup lang="ts">
import { XVirtualGrid } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'VirtualGrid'
const description = 'VirtualGrid is a component that allows you to render a grid of items in a virtualized way. It is a high-performance component that is used to render large grids of items.'
const components = [XVirtualGrid]
const demos = [{
  name: 'Usage',
  description: '',
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
