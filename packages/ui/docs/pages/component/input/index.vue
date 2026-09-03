<script setup lang="ts">
import { XInput } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import NativeAttrsDemoCode from './native-attrs.vue?raw'
import NativeAttrsDemo from './native-attrs.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'

const title = 'Input'
const description = 'Single-line text field for entering and editing short values. Use x-input in forms for names, emails, search, and other one-line data. Undeclared HTML attributes (autocomplete, aria-*, data-*, spellcheck, etc.) are forwarded to the native input; class and style apply to the field wrapper.'
const components = [XInput]
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
  description: 'Disabled, loading, and other interactive states.',
  code: StatesDemoCode,
  component: StatesDemo,
}, {
  name: 'Native attrs',
  description: 'Undeclared HTML attributes on the native input; class on the wrapper.',
  code: NativeAttrsDemoCode,
  component: NativeAttrsDemo,
}]
const back = 'inputGroup'
const next = 'radio'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/input"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
