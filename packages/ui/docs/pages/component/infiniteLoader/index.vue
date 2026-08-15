<script setup lang="ts">
import { XInfiniteLoader } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import ComposableDemoCode from './composable.vue?raw'
import ComposableDemo from './composable.vue'

const title = 'InfiniteLoader'
const description = 'Loads more list items as the user scrolls near the end of a container. Use InfiniteLoader for feeds and catalogs that grow on demand.'
const components = [XInfiniteLoader]
const demos = [{
  name: 'Usage',
  description: 'Scroll to load more items as you reach the end.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Composable',
  description: 'Using the infinite-loader composable API.',
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
