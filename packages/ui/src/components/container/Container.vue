<script lang="ts">
const containerProps = {
  tag: {
    type: String,
    default: 'div',
  },
}

export type ContainerProps = ExtractPublicPropTypes<typeof containerProps>

export default { name: 'XContainer' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme } from '../../composables/theme'

import theme from './Container.theme'

const props = defineProps(containerProps)

const { styles, classes, className } = useTheme('container', theme, props)
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
