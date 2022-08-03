<script setup lang="ts">
import { XMenu, XMenuItem } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Menu'
const description = 'Menu.'
const components = [XMenu, XMenuItem]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'link'
const next = 'modal'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/docs/src/pages/component/menu"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
