<script setup lang="ts">
import { XModal } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import ComposedDemoCode from './composed.vue?raw'
import ComposedDemo from './composed.vue'

const title = 'Modal'
const description = 'Dialog overlay that focuses attention on a task or message above the current page. Use modals for confirmations, forms, and details that need temporary focus.'
const components = [XModal]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Composed',
  description: 'Modal with header, body, and footer slots.',
  code: ComposedDemoCode,
  component: ComposedDemo,
}]
const back = 'menu'
const next = 'notifications'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/modal"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
