<script setup lang="ts">
import { XBadge } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Badge'
const description = 'Small status indicators that overlay or sit beside another element—counts, labels, or presence dots. Use badges to draw attention without interrupting the layout.'
const components = [XBadge]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'avatar'
const next = 'breadcrumbs'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/badge"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
