<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const dividerProps = {
  label: {
    type: String,
    description: 'Optional text shown between the divider lines.',
  },
  vertical: optionalBooleanProp('Renders the divider vertically instead of horizontally.'),
}

export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>

type InternalClasses = 'wrapper' | 'label' | 'line'
export interface DividerTheme extends ThemeComponent<DividerProps, InternalClasses> {}

export default {
  name: 'XDivider',
  docs: {},
}
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
