<script setup lang="ts">
import { XQrCode } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'QR Code'
const description = 'The QR Code component is used to generate a QR code.'
const components = [XQrCode]
const demos = [{
  name: 'Usage',
  description: '',
  code: UsageDemoCode,
  component: UsageDemo,
}]
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/qrCode"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
  />
</template>
