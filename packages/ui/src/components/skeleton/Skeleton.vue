<script lang="ts">
export default { name: 'XSkeleton' }
</script>

<script setup lang="ts">
import { useTheme } from '../../composables/theme'

import theme from './Skeleton.theme'

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
})

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
