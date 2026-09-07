<script setup lang="ts">
import { XTextarea } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import NativeAttrsDemoCode from './native-attrs.vue?raw'
import NativeAttrsDemo from './native-attrs.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Textarea'
const description = 'Multi-line text field for longer content such as comments and descriptions. Use Textarea when a single-line input is not enough. Undeclared HTML attributes (autocomplete, aria-*, data-*, spellcheck, etc.) are forwarded to the native textarea; class and style apply to the field wrapper.'
const components = [XTextarea]
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
  description: 'Undeclared HTML attributes on the native textarea; class on the wrapper.',
  code: NativeAttrsDemoCode,
  component: NativeAttrsDemo,
}]
const back = 'slider'
const next = 'toggle'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/textarea"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
