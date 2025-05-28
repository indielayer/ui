<script setup lang="ts">
import { XTag } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Tag'
const description = 'Tags are compact elements used to display brief information, such as categories, statuses, or labels. They help organize content and provide quick context or filtering options within lists and interfaces.'
const components = [XTag]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'tabs'
const next = 'tooltip'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/tag"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
