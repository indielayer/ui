<script lang="ts">
const labelProps = {
  ...useCommon.props(),
  label: String,
  disabled: Boolean,
  required: Boolean,
  block: Boolean,
  isInsideForm: Boolean,
  tag: {
    type: String,
    default: 'label',
  },
  tooltip: String,
}

export type LabelProps = ExtractPublicPropTypes<typeof labelProps>

type InternalClasses = 'wrapper' | 'label'
export interface LabelTheme extends ThemeComponent<LabelProps, InternalClasses> {}

export default {
  name: 'XLabel',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import XToggleTip from '../tooltip/ToggleTip.vue'

const props = defineProps(labelProps)

const { styles, classes, className } = useTheme('Label', {}, props)
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[className, classes.wrapper]"
  >
    <component
      :is="tag === 'fieldset' ? 'legend' : 'p'"
      v-if="label"
      :title="label"
      :class="classes.label"
    >
      <span>{{ label }}</span>
      <x-toggle-tip v-if="tooltip" :content="tooltip"/>
    </component>
    <slot></slot>
  </component>
</template>
