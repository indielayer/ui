<script setup lang="ts">
import { XSlider } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Slider'
const description = 'Sliders allow users to select a numeric value or range by dragging a handle along a track. They are ideal for adjusting settings such as volume, brightness, or price filters.'
const components = [XSlider]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
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
