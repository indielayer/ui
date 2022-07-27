<script lang="ts">
export default { name: 'XButtonGroup' }
</script>

<script setup lang="ts">
import { provide } from 'vue'
import { useTheme } from '../../composables/theme'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInteractive } from '../../composables/interactive'
import { injectButtonGroupKey } from '../../composables/keys'

import theme from './ButtonGroup.theme'

const props = defineProps({
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
})

provide(injectButtonGroupKey, {
  groupProps: props,
  isButtonGroup: true,
})

const { className, classes, styles } = useTheme('button-group', theme, props)
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
      @apply rounded-l-md
    }

    > :last-child {
      @apply rounded-r-md
    }
  }

  &--rounded {
    > :first-of-type {
      @apply rounded-l-full
    }

    > :last-child {
      @apply rounded-r-full
    }
  }
}
</style>
