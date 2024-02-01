<script setup lang="ts">
import { XDivider } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import LabelDemoCode from './label.vue?raw'
import LabelDemo from './label.vue'
import VerticalDemoCode from './vertical.vue?raw'
import VerticalDemo from './vertical.vue'

const title = 'Divider'
const description = 'Dividers are used to separate content.'
const components = [XDivider]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Label',
  description: '',
  code: LabelDemoCode,
  component: LabelDemo,
}, {
  name: 'Vertical',
  description: '',
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
