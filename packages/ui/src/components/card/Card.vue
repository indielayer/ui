<script lang="ts">
export default { name: 'XCard' }
</script>

<script setup lang="ts">
import { useTheme } from '../../composables/theme'

import theme from './Card.theme'

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  flat: Boolean,
})

const { styles, classes, className } = useTheme('card', theme, props)
</script>

<template>
  <component
    :is="tag"
    :styles="styles"
    :class="[
      className,
      classes.wrapper
    ]"
  >
    <slot></slot>
  </component>
</template>
