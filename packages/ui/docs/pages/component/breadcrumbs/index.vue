<script setup lang="ts">
import { XBreadcrumbs } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Breadcrumbs'
const description = 'Breadcrumbs are used to indicate the current page\'s location within a navigational hierarchy.'
const components = [XBreadcrumbs]
const demos = [{
  name: 'Usage',
  description: '',
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
