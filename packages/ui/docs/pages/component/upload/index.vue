<script setup lang="ts">
import { XUpload } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'

const title = 'Upload'
const description = 'File picker with drag-and-drop for selecting one or more files to upload. Use Upload when forms need images, documents, or other file input with accept filters.'
const components = [XUpload]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}]
const back = 'toggle'
const next = 'accordion'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/upload"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
