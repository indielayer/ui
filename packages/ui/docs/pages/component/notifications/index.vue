<script setup lang="ts">
import { XNotifications } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Notifications'
const description = 'Toast-style feedback for success, warning, or error after an action. Use notifications for transient messages that should not block the page.'
const components = [XNotifications]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'modal'
const next = 'pagination'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/notifications"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
