<script setup lang="ts">
import { XDivider } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import LabelDemoCode from './label.vue?raw'
import LabelDemo from './label.vue'
import VerticalDemoCode from './vertical.vue?raw'
import VerticalDemo from './vertical.vue'

const title = 'Divider'
const description = 'A horizontal or vertical rule that separates sections of content. Use dividers in lists, toolbars, and layouts to create clear visual breaks.'
const components = [XDivider]
const demos = [{
  name: 'Usage',
  description: 'Basic horizontal divider between content.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Label',
  description: 'Divider with a centered or inline label.',
  code: LabelDemoCode,
  component: LabelDemo,
}, {
  name: 'Vertical',
  description: 'Vertical divider for side-by-side layouts.',
  code: VerticalDemoCode,
  component: VerticalDemo,
}]
const back = 'container'
const next = 'drawer'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/divider"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
