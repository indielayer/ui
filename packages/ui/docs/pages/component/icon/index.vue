<script setup lang="ts">
import { XIcon } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import FormatsDemoCode from './formats.vue?raw'
import FormatsDemo from './formats.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'

const title = 'Icon'
const description = 'Icons visually represent actions and concepts. Register SVG paths in a global map, then reference them by name on XIcon.'
const components = [XIcon]
const demos = [{
  name: 'Usage',
  description: 'Browse icons registered in the docs app (docs/icons.ts).',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Formats',
  description: 'Registry keys, full SVG strings, raw paths, and filled object configs.',
  code: FormatsDemoCode,
  component: FormatsDemo,
}, {
  name: 'Variants',
  description: 'Color via class and size prop.',
  code: VariantsDemoCode,
  component: VariantsDemo,
}]
const back = 'drawer'
const next = 'image'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/icon"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
