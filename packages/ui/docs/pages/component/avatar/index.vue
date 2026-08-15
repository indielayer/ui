<script setup lang="ts">
import { XAvatar } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'

const title = 'Avatar'
const description = 'Displays a user\'s photo, initials, or icon in a compact frame. Use avatars in lists, headers, and comments to identify people at a glance.'
const components = [XAvatar]
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
}]
const back = 'alert'
const next = 'badge'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/avatar"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
