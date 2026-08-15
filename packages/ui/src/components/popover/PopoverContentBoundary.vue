<script lang="ts">
export default {
  name: 'XPopoverContentBoundary',
  docs: {
    slots: {
      default: 'Popover content isolated from parent ButtonGroup provide/inject.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { injectButtonGroupKey } from '../../composables/keys'
import type { ButtonGroupInjection } from '../button/ButtonGroup.vue'

/** Isolate popover content from parent ButtonGroup (provide/inject crosses teleport). */
const inactiveButtonGroup: ButtonGroupInjection = {
  isButtonGroup: false,
  groupProps: {},
  registerChild: () => {},
  unregisterChild: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
}

provide(injectButtonGroupKey, inactiveButtonGroup)
</script>

<template>
  <slot ></slot>
</template>
