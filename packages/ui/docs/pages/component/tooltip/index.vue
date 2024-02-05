<script setup lang="ts">
import { XTooltip, XToggleTip } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Tooltip'
const description = 'Tooltips are used to display a message when hovering over an element.'
const components = [XTooltip, XToggleTip]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'tag'
const next = ''
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/tooltip"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
