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
      {{ label }}
    </component>
    <slot></slot>
  </component>
</template>
