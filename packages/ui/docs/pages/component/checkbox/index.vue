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
const description = 'Checkboxes enable users to select one or multiple options from a list. They are ideal for toggling settings or making selections where more than one choice is allowed. Each checkbox can be checked or unchecked independently.'
const components = [XCheckbox]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Variants',
  description: '',
  code: VariantsDemoCode,
  component: VariantsDemo,
}, {
  name: 'Size',
  description: '',
  code: SizeDemoCode,
  component: SizeDemo,
}, {
  name: 'States',
  description: '',
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
