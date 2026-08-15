<script setup lang="ts">
import { XDrawer } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Drawer'
const description = 'Panels that slide in from the screen edge for navigation, filters, or extra content. Use drawers when side context should overlay without leaving the page.'
const components = [XDrawer]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'divider'
const next = 'empty'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/drawer"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
