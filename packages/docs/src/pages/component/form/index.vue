<script setup lang="ts">
import { XForm } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Form'
const description = 'Form.'
const components = [XForm]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'checkbox'
const next = 'input'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/docs/src/pages/component/form"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
