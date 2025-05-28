<script setup lang="ts">
import { XDrawer } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Drawer'
const description = 'Drawers slide in from the edge of the screen to present navigation, options, or additional content without disrupting the main view. They are ideal for menus, filters, or contextual panels.'
const components = [XDrawer]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'divider'
const next = 'icon'
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
