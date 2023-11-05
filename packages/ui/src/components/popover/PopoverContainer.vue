<script lang="ts">
const popoverContainerProps = {
  tag: {
    default: 'div',
    type: String,
  },
}

export type PopoverContainerProps = ExtractPublicPropTypes<typeof popoverContainerProps>

export default { name: 'XPopoverContainer' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme } from '../../composables/theme'

import theme from './PopoverContainer.theme'

const props = defineProps(popoverContainerProps)

const { styles, classes, className } = useTheme('popover-container', theme, props)
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[
      className,
      classes.wrapper
    ]"
  >
    <slot></slot>
  </component>
</template>
