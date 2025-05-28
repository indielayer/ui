<script setup lang="ts">
import { XFormGroup } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'FormGroup'
const description = 'Form groups organize related form elements together, providing structure and shared validation. They help group checkboxes, radio buttons, or inputs that belong to the same logical section.'
const components = [XFormGroup]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'form'
const next = 'input'
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
