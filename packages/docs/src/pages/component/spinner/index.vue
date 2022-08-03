<script setup lang="ts">
import { XSpinner } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'

const title = 'Spinner'
const description = 'Spinner.'
const components = [XSpinner]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Variants',
  description: '',
  code: VariantsDemoCode,
  component: VariantsDemo,
}]
const back = 'slider'
const next = 'table'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/docs/src/pages/component/spinner"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
