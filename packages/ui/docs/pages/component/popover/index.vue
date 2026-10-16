<script setup lang="ts">
import { XPopover, XPopoverContainer } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Popover'
const description = 'Floating panel anchored to a trigger for extra content or actions. Use popovers for menus and contextual UI without leaving the current view.'
const components = [XPopover, XPopoverContainer]
const demos = [{
  name: 'Usage',
  description: 'Button trigger that opens a menu inside a popover container.',
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
