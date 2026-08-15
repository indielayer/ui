<script setup lang="ts">
import { XFormGroup } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'FormGroup'
const description = 'Groups related fields with a shared label and validation context. Use form groups for checkboxes, radios, or inputs that belong to one logical section.'
const components = [XFormGroup]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'form'
const next = 'inputGroup'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/checkbox"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
