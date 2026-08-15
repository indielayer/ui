<script setup lang="ts">
import { XMenu, XMenuItem } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Menu'
const description = 'Dropdown list of actionable items triggered from a button or other control. Use x-menu with x-menu-item for contextual actions and navigation.'
const components = [XMenu, XMenuItem]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'link'
const next = 'modal'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/menu"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
