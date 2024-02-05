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

type InternalClasses = 'wrapper' | 'list' | 'item'
export interface ProgressTheme extends ThemeComponent<ProgressProps, InternalClasses> {}

export default { name: 'XProgress' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(progressProps)

const { styles, classes, className } = useTheme('Progress', {}, props)
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
      class="absolute h-full bg-secondary-100 dark:bg-secondary-700 right-0 top-0"
      :class="{ 'duration-150 transition-[width]': animate }"
      :style="{
        width: `${100 - percentage}%`
      }"
    ></div>
  </div>
</template>
