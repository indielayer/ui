<script lang="ts">
const cardProps = {
  tag: {
    type: String,
    default: 'div',
  },
  flat: Boolean,
}

export type CardProps = ExtractPublicPropTypes<typeof cardProps>

type InternalClasses = 'wrapper'
export interface CardTheme extends ThemeComponent<CardProps, InternalClasses> {}

export default { name: 'XCard' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(cardProps)

const { styles, classes, className } = useTheme('Card', {}, props)
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
