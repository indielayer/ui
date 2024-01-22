<script lang="ts">
const skeletonProps = {
  tag: {
    type: String,
    default: 'div',
  },
}

export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>

type InternalClasses = 'wrapper'
export interface SkeletonTheme extends ThemeComponent<SkeletonProps, InternalClasses> {}

export default { name: 'XSkeleton' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
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
