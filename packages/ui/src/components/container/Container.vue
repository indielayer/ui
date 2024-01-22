<script lang="ts">
const containerProps = {
  tag: {
    type: String,
    default: 'div',
  },
}

export type ContainerProps = ExtractPublicPropTypes<typeof containerProps>

type InternalClasses = 'wrapper'
export interface ContainerTheme extends ThemeComponent<ContainerProps, InternalClasses> {}

export default { name: 'XContainer' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(containerProps)

const { styles, classes, className } = useTheme('Container', {}, props)
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
