<script lang="ts">
const skeletonProps = {
  tag: {
    type: String,
    default: 'div',
  },
}

export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>

export default { name: 'XSkeleton' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme } from '../../composables/theme'

import theme from './Skeleton.theme'

const props = defineProps(skeletonProps)

const { styles, classes, className } = useTheme('skeleton', theme, props)
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
