<script setup lang="ts">
import { XTable, XTableBody, XTableCell, XTableHead, XTableHeader, XTableRow } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Table'
const description = 'Tables are used to display data in a tabular format.'
const components = [XTable, XTableBody, XTableCell, XTableHead, XTableHeader, XTableRow]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'States',
  description: '',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = 'spinner'
const next = 'tabs'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/table"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
