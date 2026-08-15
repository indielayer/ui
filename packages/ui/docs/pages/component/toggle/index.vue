<script setup lang="ts">
import { XToggle } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Toggle'
const description = 'Binary switch for on/off settings and mutually exclusive states. Use toggles when the choice should feel instant and reversible.'
const components = [XToggle]
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
  name: 'States',
  description: 'Disabled, loading, and other interactive states.',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = 'textarea'
const next = 'upload'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/toggle"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
