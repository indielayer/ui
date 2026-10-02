<script lang="ts">
export default {
  name: 'XPopoverContentBoundary',
  docs: {
    slots: {
      default: 'Popover content isolated from parent ButtonGroup and InputGroup provide/inject.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { injectButtonGroupKey, injectInputGroupKey } from '../../composables/keys'
import type { ButtonGroupInjection } from '../button/ButtonGroup.vue'
import type { InputGroupInjection } from '../inputGroup/InputGroup.vue'

/** Isolate popover content from parent group provide/inject (crosses teleport). */
const inactiveButtonGroup: ButtonGroupInjection = {
  isButtonGroup: false,
  groupProps: {},
  registerChild: () => {},
  unregisterChild: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
}

const inactiveInputGroup: InputGroupInjection = {
  registerChild: () => {},
  unregisterChild: () => {},
  registerInput: () => {},
  unregisterInput: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
  isInsideInputGroup: false,
  groupProps: {},
}

provide(injectButtonGroupKey, inactiveButtonGroup)
provide(injectInputGroupKey, inactiveInputGroup)
</script>

<template>
  <slot ></slot>
</template>
