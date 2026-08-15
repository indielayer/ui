<script lang="ts">
const shapes = ['line', 'circle'] as const

export type SkeletonShape = typeof shapes[number]

const validators = {
  shape: shapes,
}

const skeletonProps = {
  tag: {
    type: String,
    default: 'div',
    description: 'Root element tag.',
  },
  shape: {
    type: String as PropType<SkeletonShape>,
    default: 'line',
    validator: (val: SkeletonShape) => validators.shape.includes(val),
    description: 'Placeholder shape (line or circle).',
  },
}

export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>

type InternalClasses = 'wrapper'
export interface SkeletonTheme extends ThemeComponent<SkeletonProps, InternalClasses> {}

export default {
  name: 'XSkeleton',
  validators,
  docs: {},
}
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(skeletonProps)

const { styles, classes, className } = useTheme('Skeleton', {}, props)
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
    &#8203;
  </component>
</template>
