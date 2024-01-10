<script lang="ts">
const buttonGroupProps = {
  ...useCommon.props(),
  ...useColors.props(),
  ...useInteractive.props(),
  tag: {
    type: String,
    default: 'div',
  },
  outlined: Boolean,
  rounded: Boolean,
  ghost: Boolean,
  light: Boolean,
  flat: Boolean,
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
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { injectButtonGroupKey } from '../../composables/keys'

const props = defineProps(buttonGroupProps)

provide(injectButtonGroupKey, {
  groupProps: props,
  isButtonGroup: true,
})

const { className, classes, styles } = useTheme('ButtonGroup', {}, props)
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[
      className,
      $style['button-group'],
      rounded ? $style['button-group--rounded'] : '',
      classes.wrapper
    ]"
  >
    <slot></slot>
  </component>
</template>

<style lang="postcss" module>
.button-group {
  &:not(&--rounded) {
    > :first-child {
      @apply rounded-l-md;
    }

    > :last-child {
      @apply rounded-r-md;
    }
  }

  &--rounded {
    > :first-of-type {
      @apply rounded-l-full;
    }

    > :last-child {
      @apply rounded-r-full;
    }
  }
}
</style>
