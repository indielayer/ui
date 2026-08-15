<script setup lang="ts">
import { XRadio, XRadioButton } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import PaymentMethodDemoCode from './payment-method.vue?raw'
import PaymentMethodDemo from './payment-method.vue'
import RadioButtonDemoCode from './radio-button.vue?raw'
import RadioButtonDemo from './radio-button.vue'
import RadioButtonFormGroupDemoCode from './radio-button-form-group.vue?raw'
import RadioButtonFormGroupDemo from './radio-button-form-group.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'
import SizeDemoCode from './size.vue?raw'
import SizeDemo from './size.vue'

const title = 'Radio'
const description = 'Radios allow the user to select one option from a set. Use classic radios for standard options, or x-radio-button for a button-shaped variant. Place several x-radio-button options inside x-form-group for a joined segmented control.'
const components = [XRadio, XRadioButton]
const demos = [{
  name: 'Usage',
  description: 'Basic example with common props.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Payment method',
  description: 'Bordered cards with default slot content for extra details.',
  code: PaymentMethodDemoCode,
  component: PaymentMethodDemo,
}, {
  name: 'Radio button',
  description: 'Button-shaped options with a shared model value.',
  code: RadioButtonDemoCode,
  component: RadioButtonDemo,
}, {
  name: 'Radio button group',
  description: 'Inside x-form-group, options render as a single joined control.',
  code: RadioButtonFormGroupDemoCode,
  component: RadioButtonFormGroupDemo,
}, {
  name: 'States',
  description: 'Disabled, loading, and other interactive states.',
  code: StatesDemoCode,
  component: StatesDemo,
}, {
  name: 'Size',
  description: 'Size options from xs to lg.',
  code: SizeDemoCode,
  component: SizeDemo,
}]
const back = 'input'
const next = 'select'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/radio"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
