<script lang="ts">
const dividerProps = {
  label: String,
  vertical: Boolean,
}

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

type InternalClasses = 'wrapper' | 'label' | 'line'
export interface DividerTheme extends ThemeComponent<DividerProps, InternalClasses> {}

export default { name: 'XDivider' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(dividerProps)

const { styles, classes, className } = useTheme('Divider', {}, props)
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
      :class="classes.line"
      :style="[
        {
          width: vertical ? '1px' : 'auto',
          height: !vertical ? '1px' : 'auto'
        }
      ]"
    ></div>
    <div
      v-if="label"
      class="font-medium text-sm text-secondary-600 dark:text-secondary-300"
      :class="[
        classes.label,
        {
          'my-2': vertical,
          'mx-4': !vertical
        }]"
      v-text="label"
    ></div>
    <div
      :class="classes.line"
      :style="[
        {
          width: vertical ? '1px' : 'auto',
          height: !vertical ? '1px' : 'auto'
        }
      ]"
    ></div>
  </div>
</template>
