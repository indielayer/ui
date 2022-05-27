<script lang="ts">
import { defineComponent, provide } from 'vue'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'
import { useInteractive } from '@/composables/interactive'
import { injectButtonGroupKey } from '@/composables/keys'

export default defineComponent({
  name: 'XButtonGroup',

  validators: {
    ...useCommon.validators(),
  },

  props: {
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
  },

  setup(props) {
    provide(injectButtonGroupKey, {
      groupProps: props,
      isButtonGroup: true,
    })
  },
})
</script>

<template>
  <component
    :is="tag"
    class="inline-flex align-middle relative"
    :class="[
      $style['button-group'],
      rounded ? $style['button-group--rounded'] : ''
    ]"
  >
    <slot></slot>
  </component>
</template>

<style lang="postcss" module>
.button-group {
  &:not(&--rounded) {
    > :first-child {
      @apply rounded-l-md border-l
    }

    > :last-child {
      @apply rounded-r-md
    }
  }

  &--rounded {
    > :first-of-type {
      @apply rounded-l-full border-l
    }

    > :last-child {
      @apply rounded-r-full
    }
  }
}
</style>
