<script setup lang="ts">
import { XNotifications } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Notifications'
const description = 'Notifications provide timely feedback or alerts to users, such as success messages, warnings, or errors. They help keep users informed about important events or actions.'
const components = [XNotifications]
const demos = [{
  name: 'Usage',
  description: '',
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
