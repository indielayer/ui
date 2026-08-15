<script setup lang="ts">
import { XSpacer } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Spacer'
const description = 'Flex-friendly gap that expands or shrinks between siblings without extra margin or padding. Use spacers to push items apart in toolbars and rows.'
const components = [XSpacer]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'scroll'
const next = ''
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/spacer"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
