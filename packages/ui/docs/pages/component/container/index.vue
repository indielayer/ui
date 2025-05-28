<script setup lang="ts">
import { XContainer } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Container'
const description = 'Containers provide a flexible layout element for grouping and organizing content. They help structure pages by controlling width, alignment, and spacing, ensuring consistent presentation across different sections.'
const components = [XContainer]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'carousel'
const next = 'divider'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/container"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
