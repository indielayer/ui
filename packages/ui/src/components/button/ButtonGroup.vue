<script lang="ts">
import { variantBooleanProps } from '../../common/props'

const buttonGroupProps = {
  ...useCommon.props(),
  ...useColors.props(),
  ...useInteractive.props(),
  ...variantBooleanProps(),
  tag: {
    type: String,
    default: 'div',
  },
}

export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>
export type ButtonGroupInjection = {
  groupProps: ButtonGroupProps;
  isButtonGroup: boolean;
}

type InternalClasses = 'wrapper'
type InternalExtraData = { isButtonGroupGroup: boolean; }
export interface ButtonGroupTheme extends ThemeComponent<ButtonGroupProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XButtonGroup',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { provide, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { injectButtonGroupKey } from '../../composables/keys'

const props = defineProps(buttonGroupProps)
const resolvedProps = useResolvedComponentProps('ButtonGroup', props)

provide(injectButtonGroupKey, {
  groupProps: props,
  isButtonGroup: true,
})

const { className, classes, styles } = useTheme('ButtonGroup', {}, resolvedProps)
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[
      className,
      $style['button-group'],
      resolvedProps.rounded ? $style['button-group--rounded'] : '',
      classes.wrapper
    ]"
  >
    <slot></slot>
  </component>
</template>

<style module>
.button-group:not(.button-group--rounded) > :first-child {
  border-start-start-radius: var(--radius-md);
  border-end-start-radius: var(--radius-md);
}

.button-group:not(.button-group--rounded) > :last-child {
  border-start-end-radius: var(--radius-md);
  border-end-end-radius: var(--radius-md);
}

.button-group--rounded > :first-of-type {
  border-start-start-radius: 9999px;
  border-end-start-radius: 9999px;
}

.button-group--rounded > :last-child {
  border-start-end-radius: 9999px;
  border-end-end-radius: 9999px;
}
</style>
