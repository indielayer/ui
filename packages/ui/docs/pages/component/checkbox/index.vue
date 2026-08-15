<script setup lang="ts">
import { XCheckbox } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Checkbox'
const description = 'Multi-select controls for choosing one or more options independently. Use checkboxes for settings and lists where more than one choice can be active.'
const components = [XCheckbox]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Variants',
  description: 'Color and style variants.',
  code: VariantsDemoCode,
  component: VariantsDemo,
}, {
  name: 'Size',
  description: 'Size options from xs to lg.',
  code: SizeDemoCode,
  component: SizeDemo,
}, {
  name: 'States',
  description: 'Disabled, indeterminate, and other interactive states.',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = 'button'
const next = 'form'
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
