<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const cardProps = {
  tag: {
    type: String,
    default: 'div',
    description: 'Root element tag.',
  },
  flat: optionalBooleanProp('Removes elevation and border emphasis.'),
}

export type CardProps = ExtractPublicPropTypes<typeof cardProps>

type InternalClasses = 'wrapper'
export interface CardTheme extends ThemeComponent<CardProps, InternalClasses> {}

export default {
  name: 'XCard',
  docs: {
    slots: {
      default: 'Card content.',
    },
  },
}
</script>

<script setup lang="ts">
import { provide, type ExtractPublicPropTypes } from 'vue'
import { injectCardKey } from '../../composables/keys'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(cardProps)

provide(injectCardKey, true)

const { styles, classes, className } = useTheme('Card', {}, props)
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
