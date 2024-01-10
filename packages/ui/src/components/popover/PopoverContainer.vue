<script lang="ts">
const popoverContainerProps = {
  tag: {
    default: 'div',
    type: String,
  },
}

export type PopoverContainerProps = ExtractPublicPropTypes<typeof popoverContainerProps>

type InternalClasses = 'wrapper'
export interface PopoverContainerTheme extends ThemeComponent<PopoverContainerProps, InternalClasses> {}

export default { name: 'XPopoverContainer' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(popoverContainerProps)

const { styles, classes, className } = useTheme('PopoverContainer', {}, props)
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
