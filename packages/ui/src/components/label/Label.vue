<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const labelProps = {
  ...useCommon.props(),
  label: String,
  disabled: Boolean,
  required: Boolean,
  block: optionalBooleanProp(),
  isInsideForm: Boolean,
  isInsideInputGroup: Boolean,
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
