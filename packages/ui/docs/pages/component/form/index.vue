<script setup lang="ts">
import { XForm } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Form'
const description = 'Forms provide a structured way to collect and validate user input, such as text, selections, and files. They support features like validation, grouping, and submission handling, making it easy to build interactive and accessible data entry interfaces.'
const components = [XForm]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'checkbox'
const next = 'formGroup'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/form"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
