<script setup lang="ts">
import { XUpload } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import NativeAttrsDemoCode from './native-attrs.vue?raw'
import NativeAttrsDemo from './native-attrs.vue'

const title = 'Upload'
const description = 'File picker with drag-and-drop for selecting one or more files to upload. Use Upload when forms need images, documents, or other file input with accept filters. Undeclared HTML attributes are forwarded to the native file input; class and style apply to the outer wrapper.'
const components = [XUpload]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Native attrs',
  description: 'data-testid on the hidden file input; class on the outer wrapper.',
  code: NativeAttrsDemoCode,
  component: NativeAttrsDemo,
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
