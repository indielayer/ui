<script setup lang="ts">
import { XBreadcrumbs } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Breadcrumbs'
const description = 'Shows the current page\'s place in a navigational hierarchy. Use breadcrumbs for deep page trees so users can jump back to parent sections.'
const components = [XBreadcrumbs]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'badge'
const next = 'card'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/breadcrumbs"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
