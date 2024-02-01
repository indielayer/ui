<script setup lang="ts">
import { XRadio } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'

const title = 'Radio'
const description = 'Radios allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side.'
const components = [XRadio]
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
  name: 'States',
  description: '',
  code: StatesDemoCode,
  component: StatesDemo,
}, {
  name: 'Size',
  description: '',
  code: SizeDemoCode,
  component: SizeDemo,
}]
const back = 'input'
const next = 'select'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/radio"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
