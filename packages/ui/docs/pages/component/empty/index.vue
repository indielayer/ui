<script setup lang="ts">
import { XEmpty } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import ActionsDemoCode from './actions.vue?raw'
import ActionsDemo from './actions.vue'
import BorderedDemoCode from './bordered.vue?raw'
import BorderedDemo from './bordered.vue'

const title = 'Empty'
const description = 'Empty states communicate when there is no content to show. Use them in tables, lists, and panels with a title, description, optional icon, and actions.'
const components = [XEmpty]
const demos = [{
  name: 'Usage',
  description: 'Title, description, and optional icon for empty content.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Actions',
  description: 'Empty state with call-to-action buttons.',
  code: ActionsDemoCode,
  component: ActionsDemo,
}, {
  name: 'Bordered',
  description: 'Empty state inside a bordered container.',
  code: BorderedDemoCode,
  component: BorderedDemo,
}]
const back = 'drawer'
const next = 'icon'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/empty"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
