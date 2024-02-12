<script setup lang="ts">
import { XDatepicker } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Datepicker'
const description = 'The datepicker component is used to select a date or time.'
const components = [XDatepicker]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/datepicker"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
  >
    <x-alert type="info" color="warning" outlined>
      This component is just a wrapper for the @vuepic/vue-datepicker package to fit the look and feel. For more documentation please see <x-link
        href="https://vue3datepicker.com/"
        external
        target="blank"
        shadow
        rel="noopener noreferrer"
      >@vuepic/vue-datepicker</x-link> documentation.
    </x-alert>
  </document-page>
</template>
