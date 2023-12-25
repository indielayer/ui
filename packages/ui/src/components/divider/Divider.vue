<script lang="ts">
const dividerProps = {
  label: String,
  vertical: Boolean,
}

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

export default { name: 'XDivider' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme } from '../../composables/useTheme'

import theme from './Divider.theme'

const props = defineProps(dividerProps)

const { styles, classes, className } = useTheme('divider', theme, props)
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
      class="font-medium text-sm text-gray-600 dark:text-gray-300"
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
