<script lang="ts">
const cardProps = {
  tag: {
    type: String,
    default: 'div',
  },
  flat: Boolean,
}

export type CardProps = ExtractPublicPropTypes<typeof cardProps>

export default { name: 'XCard' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme } from '../../composables/theme'

import theme from './Card.theme'

const props = defineProps(cardProps)

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
