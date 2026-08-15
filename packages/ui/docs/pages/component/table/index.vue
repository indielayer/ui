<script setup lang="ts">
import { XTable, XTableBody, XTableCell, XTableHead, XTableHeader, XTableRow } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VirtualDemoCode from './virtual.vue?raw'
import VirtualDemo from './virtual.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'
import SelectableDemoCode from './selectable.vue?raw'
import SelectableDemo from './selectable.vue'

const title = 'Table'
const description = 'Tables display tabular data with single- or multi-column sorting, selection, expandable rows, and virtual lists.'
const components = [XTable, XTableBody, XTableCell, XTableHead, XTableHeader, XTableRow]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Selectable',
  description: 'Row selection with checkboxes.',
  code: SelectableDemoCode,
  component: SelectableDemo,
}, {
  name: 'Virtual List',
  description: 'Virtualized rows for large datasets.',
  code: VirtualDemoCode,
  component: VirtualDemo,
}, {
  name: 'States',
  description: 'Loading, empty, and other table states.',
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
