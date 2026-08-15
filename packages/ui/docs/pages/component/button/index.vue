<script setup lang="ts">
import { XButton, XButtonGroup } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import VariantsDemoCode from './variants.vue?raw'
import VariantsDemo from './variants.vue'
import IconsDemoCode from './icons.vue?raw'
import IconsDemo from './icons.vue'
import TooltipDemoCode from './tooltip.vue?raw'
import TooltipDemo from './tooltip.vue'
import ButtonGroupDemoCode from './button-group.vue?raw'
import ButtonGroupDemo from './button-group.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Button'
const description = 'Clickable controls for primary actions—submit, open dialogs, or run commands. Customize style, size, and icons; group related actions with x-button-group.'
const components = [XButton, XButtonGroup]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Variants',
  description: 'Color and style variants.',
  code: VariantsDemoCode,
  component: VariantsDemo,
}, {
  name: 'Icons',
  description: 'Leading, trailing, and icon-only buttons.',
  code: IconsDemoCode,
  component: IconsDemo,
}, {
  name: 'Tooltip',
  description: 'Buttons with hover tooltips.',
  code: TooltipDemoCode,
  component: TooltipDemo,
}, {
  name: 'Size',
  description: 'Size options from xs to lg.',
  code: SizeDemoCode,
  component: SizeDemo,
}, {
  name: 'Button Group',
  description: 'Joined buttons sharing a common group layout.',
  code: ButtonGroupDemoCode,
  component: ButtonGroupDemo,
}, {
  name: 'States',
  description: 'Disabled, loading, and other interactive states.',
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
