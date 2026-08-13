<script setup lang="ts">
import { XImage } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import SizingDemoCode from './sizing.vue?raw'
import SizingDemo from './sizing.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Image'
const description = 'Loads a remote image after preloading. Use a background on the wrapper for a visible placeholder until load completes.'
const components = [XImage]
const demos = [{
  name: 'Usage',
  description: 'Basic image with alt text, dimensions, and object-cover.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Sizing',
  description: 'Common width and height combinations.',
  code: SizingDemoCode,
  component: SizingDemo,
}, {
  name: 'States',
  description: 'Loading placeholder and failed URL behavior.',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = 'icon'
const next = 'link'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/image"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
