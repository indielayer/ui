<script setup lang="ts">
import { XInfiniteLoader } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import ComposableDemoCode from './composable.vue?raw'
import ComposableDemo from './composable.vue'

const title = 'InfiniteLoader'
const description = 'InfiniteLoader is a component that allows you to load data on demand as users scroll through a list.'
const components = [XInfiniteLoader]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Composable',
  description: '',
  code: ComposableDemoCode,
  component: ComposableDemo,
}]
const back = ''
const next = ''
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/infiniteLoader"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
