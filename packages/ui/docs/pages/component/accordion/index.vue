<script setup lang="ts">
import { XAccordion, XAccordionItem } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Accordion'
const description = 'Collapsible panels for showing and hiding related content. Use x-accordion with x-accordion-item when space is limited and users need progressive disclosure.'
const components = [XAccordion, XAccordionItem]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'toggle'
const next = 'alert'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/Accordion"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
