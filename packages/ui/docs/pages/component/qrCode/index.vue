<script setup lang="ts">
import { XQrCode } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'QR Code'
const description = 'Renders a QR code from a string or URL for scanning with mobile devices. Use it for share links, payments, and quick machine-readable payloads.'
const components = [XQrCode]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
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
