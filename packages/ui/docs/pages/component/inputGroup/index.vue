<script setup lang="ts">
import { XInputGroup } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import MixedDemoCode from './mixed.vue?raw'
import MixedDemo from './mixed.vue'
import ValidationDemoCode from './validation.vue?raw'
import ValidationDemo from './validation.vue'

const title = 'Input Group'
const description = 'Input groups combine multiple inline fields (Input, Textarea, Select, Datepicker, Button) into one control with a shared label and footer.'
const components = [XInputGroup]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Mixed',
  description: '',
  code: MixedDemoCode,
  component: MixedDemo,
}, {
  name: 'Validation',
  description: '',
  code: ValidationDemoCode,
  component: ValidationDemo,
}]
const back = 'formGroup'
const next = 'input'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/inputGroup"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
