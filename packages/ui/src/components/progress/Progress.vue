<script lang="ts">
export default { name: 'XProgress' }
</script>

<script setup lang="ts">
import { useColors } from '../../composables/colors'
import { useTheme } from '../../composables/theme'

import theme from './Progress.theme'

const props = defineProps({
  ...useColors.props('primary'),
  percentage: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  // variant: {
  //   type: String as PropType<'bar' | 'score'>,
  //   default: 'bar',
  //   validator: (value: string) => validators.variant.includes(value),
  // },
  gradient: Boolean,
  animate: {
    type: Boolean,
    default: true,
  },
  thick: Boolean,
})

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
