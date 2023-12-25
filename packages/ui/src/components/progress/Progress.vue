<script lang="ts">
const progressProps = {
  ...useColors.props('primary'),
  percentage: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  gradient: Boolean,
  animate: {
    type: Boolean,
    default: true,
  },
  thick: Boolean,
}

export type ProgressProps = ExtractPublicPropTypes<typeof progressProps>

export default { name: 'XProgress' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useColors } from '../../composables/useColors'
import { useTheme } from '../../composables/useTheme'

import theme from './Progress.theme'

const props = defineProps(progressProps)

const { styles, classes, className } = useTheme('progress', theme, props)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      classes.wrapper
    ]"
  >
    <div
      class="h-full"
      :class="[
        gradient ? 'bg-gradient-to-r' : 'bg-[color:var(--x-progress-bg)]',
        {
          'duration-150 transition-[width]': animate
        }
      ]"
      :style="[!gradient ? {width: `${percentage}%`} : '']"
    >
    </div>
    <div
      v-if="gradient"
      class="absolute h-full bg-gray-100 dark:bg-gray-700 right-0 top-0"
      :class="{ 'duration-150 transition-[width]': animate }"
      :style="{
        width: `${100 - percentage}%`
      }"
    ></div>
  </div>
</template>
