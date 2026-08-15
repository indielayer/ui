<script setup lang="ts">
import { XSelect } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import MultipleDemoCode from './multiple.vue?raw'
import MultipleDemo from './multiple.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Select'
const description = 'Dropdown for choosing one or more options from a predefined list. Use Select for enums, filters, and form fields where free text is not needed.'
const components = [XSelect]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Multiple',
  description: 'Selecting more than one option at once.',
  code: MultipleDemoCode,
  component: MultipleDemo,
}, {
  name: 'Size',
  description: 'Size options from xs to lg.',
  code: SizeDemoCode,
  component: SizeDemo,
}, {
  name: 'States',
  description: 'Disabled, loading, and other interactive states.',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = 'radio'
const next = 'slider'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/select"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
