<script setup lang="ts">
import { XPopover, XPopoverContainer } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Popover'
const description = 'Popovers display additional information or interactive content in a floating overlay, anchored to a trigger element. They are useful for tooltips, menus, or contextual actions without navigating away from the current view.'
const components = [XPopover, XPopoverContainer]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'pagination'
const next = 'progress'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/popover"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
