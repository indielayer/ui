<script setup lang="ts">
import { XToggle } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import NativeAttrsDemoCode from './native-attrs.vue?raw'
import NativeAttrsDemo from './native-attrs.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Toggle'
const description = 'Binary switch for on/off settings and mutually exclusive states. Use toggles when the choice should feel instant and reversible. Undeclared HTML attributes are forwarded to the native checkbox; class and style apply to the wrapper label.'
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
}, {
  name: 'Native attrs',
  description: 'aria-label and title on the hidden checkbox; class on the label.',
  code: NativeAttrsDemoCode,
  component: NativeAttrsDemo,
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
