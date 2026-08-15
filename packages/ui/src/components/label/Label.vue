<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const labelProps = {
  ...useCommon.props(),
  label: {
    type: String,
    description: 'Visible label text.',
  },
  disabled: {
    type: Boolean,
    description: 'Applies disabled styling to the label.',
  },
  required: {
    type: Boolean,
    description: 'Marks the label as required for form fields.',
  },
  block: optionalBooleanProp('Stretches to the full width of the parent.'),
  isInsideForm: {
    type: Boolean,
    description: 'Indicates the label is rendered inside a form layout.',
  },
  isInsideInputGroup: {
    type: Boolean,
    description: 'Indicates the label is rendered inside an input group.',
  },
  tag: {
    type: String,
    default: 'label',
    description: 'Root element tag. Use `fieldset` for grouped controls.',
  },
  tooltip: {
    type: String,
    description: 'Tooltip text shown next to the label via a toggle tip.',
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
  docs: {
    slots: {
      default: 'Labeled control or content.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, inject, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import { injectInputGroupKey } from '../../composables/keys'
import XToggleTip from '../tooltip/ToggleTip.vue'

const props = defineProps(labelProps)

const inputGroup = inject(injectInputGroupKey, {
  registerChild: () => {},
  unregisterChild: () => {},
  registerInput: () => {},
  unregisterInput: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
  isInsideInputGroup: false,
  groupProps: {},
})

const themeProps = computed(() => ({
  ...props,
  isInsideInputGroup: props.isInsideInputGroup ?? inputGroup.isInsideInputGroup,
}))

const { styles, classes, className } = useTheme('Label', {}, themeProps)
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
