<script setup lang="ts">
import { XSkeleton } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Skeleton'
const description = 'Placeholder shapes that mirror content layout while data loads. Use skeletons to reduce layout shift and improve perceived loading performance.'
const components = [XSkeleton]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'progress'
const next = 'slider'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/skeleton"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
