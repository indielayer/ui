<script setup lang="ts">
import { XStepper } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import WizardDemoCode from './wizard.vue?raw'
import WizardDemo from './wizard.vue'

const title = 'Stepper'
const description = 'Multi-step wizard with declarative steps, named panel slots, programmatic next/prev navigation, validation hooks, and optional sidebar summaries.'
const components = [XStepper]
const demos = [{
  name: 'Usage',
  description: 'Horizontal stepper with named step slots and Previous / Next controls.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Wizard',
  description: 'Multi-step form with validation, sidebar summaries, and external footer actions.',
  code: WizardDemoCode,
  component: WizardDemo,
}]
const back = 'spinner'
const next = 'table'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/stepper"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
