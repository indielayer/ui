<script setup lang="ts">
import { XModal } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import ComposedDemoCode from './composed.vue?raw'
import ComposedDemo from './composed.vue'

const title = 'Modal'
const description = 'Modals are used to display content on top of the current page.'
const components = [XModal]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Composed',
  description: '',
  code: ComposedDemoCode,
  component: ComposedDemo,
}]
const back = 'menu'
const next = 'notifications'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/modal"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
