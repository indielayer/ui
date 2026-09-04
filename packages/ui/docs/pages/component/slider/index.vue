<script setup lang="ts">
import { XSlider } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import NativeAttrsDemoCode from './native-attrs.vue?raw'
import NativeAttrsDemo from './native-attrs.vue'

const title = 'Slider'
const description = 'Track with a draggable handle for picking a numeric value or range. Use sliders for volume, brightness, price filters, and similar continuous settings. Undeclared HTML attributes are forwarded to the native range input; class and style apply to the field wrapper.'
const components = [XSlider]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Native attrs',
  description: 'aria-label and data-testid on the range input; class on the wrapper.',
  code: NativeAttrsDemoCode,
  component: NativeAttrsDemo,
}]
const back = 'select'
const next = 'textarea'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/slider"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
