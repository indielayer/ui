<script setup lang="ts">
import { XButton, XButtonGroup } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import IconsDemoCode from './icons.vue?raw'
import IconsDemo from './icons.vue'
import ButtonGroupDemoCode from './button-group.vue?raw'
import ButtonGroupDemo from './button-group.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Button'
const description = 'Used to trigger an action, such as submitting a form, opening a menu, or performing a command.'
const components = [XButton, XButtonGroup]
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
}, {
  name: 'Icons',
  description: '',
  code: IconsDemoCode,
  component: IconsDemo,
}, {
  name: 'Size',
  description: '',
  code: SizeDemoCode,
  component: SizeDemo,
}, {
  name: 'Button Group',
  description: '',
  code: ButtonGroupDemoCode,
  component: ButtonGroupDemo,
}, {
  name: 'States',
  description: '',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = ''
const next = 'checkbox'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/button"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
