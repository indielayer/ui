<script setup lang="ts">
import { XPagination } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Pagination'
const description = 'Pagination divides large sets of content into manageable pages, allowing users to navigate through items efficiently. It is commonly used in tables, lists, and search results to improve usability and performance.'
const components = [XPagination]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'notifications'
const next = 'popover'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/pagination"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
