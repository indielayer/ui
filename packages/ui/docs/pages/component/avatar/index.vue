<script setup lang="ts">
import { XAvatar } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'

const title = 'Avatar'
const description = 'Avatars are used to represent a user.'
const components = [XAvatar]
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
