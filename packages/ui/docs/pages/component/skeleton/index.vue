<script setup lang="ts">
import { XSkeleton } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Skeleton'
const description = 'Skeletons provide placeholder elements that mimic the layout of content while data is loading. They improve perceived performance by giving users a visual cue that content is being fetched.'
const components = [XSkeleton]
const demos = [{
  name: 'Usage',
  description: '',
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
