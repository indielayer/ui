<template>
  <component
    :is="to ? 'router-link' : tag"
    ref="focusRef"
    :to="to"
    class="relative leading-tight transition-colors duration-150 cursor-pointer focus:outline-none inline-block items-center justify-center font-medium"
    :class="[
      {
        'shadow': !flat && !glow,
        [`shadow-lg shadow-${color}-500/50`]: !flat && glow,
      },
      disabled ?
        // disabled
        'border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
        : {
          // not disabled
          [`border border-${color}-500 text-${color}-500`]: outlined,

          // colors
          [`border border-transparent text-${color}-50 bg-${color}-500`]: !outlined,

          // colors hovers | actives
          'hover:bg-dark-image active:bg-darker-image active:shadow-none': !loading && !outlined,
          [`hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:hover:active:bg-gray-600`]: !loading && outlined,
        },
      $slots.default ? {
        // size
        'py-1': size === 'auto',
        'px-2 py-1 text-xs': size === 'xs',
        'px-2 py-1 text-sm': size === 'sm',
        'px-4 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
        'px-6 py-3 text-lg': size === 'lg',
        'px-10 py-6 text-xl': size === 'xl',
      } : 'px-3 py-2',
      {
        // icon
        'inline-flex items-center': icon,

        // group
        'rounded-button': group === false,
        'rounded-l-button': group === 'first',
        'rounded-r-button': group === 'last',

        '!rounded-full': rounded,

        // loading
        'cursor-default': loading,

        // content
        'flex items-center justify-center': loading,
        'flex-row-reverse': icon && iconRight
      },

    ]"

    :aria-busy="loading ? 'true' : null"
    :aria-disabled="tag !== 'button' && disabled ? 'true' : null"
    :disabled="disabled || loading"
    :type="tag === 'button' ? type : null"
  >
    <x-spinner v-if="loading" :size="size" class="absolute" />
    <span
      v-if="icon"
      class="flex"
      :class="[{
        'mr-2': $slots.default && !iconRight,
        'ml-2': $slots.default && iconRight,
        'invisible': loading
      }]"
    >
      <x-icon :size="size" :icon="icon" />
    </span>
    <span :class="{ 'invisible': loading }">
      <slot></slot>
    </span>
  </component>
</template>

<script>
import { withProps, withValidator, useInteractive } from '../../composables/interactive'
import XSpinner from '../spinner/Spinner.vue'
import XIcon from '../icon/Icon.vue'

const validator = {
  group: [false, true, '', 'first', 'last'],
}

export default {
  name: 'XButton',
  components: {
    XSpinner,
    XIcon,
  },

  validator: {
    ...withValidator(),
    ...validator,
  },

  props: {
    ...withProps(),

    group: {
      default: false,
      type: [String, Boolean],
      validator: (value) => validator.group.includes(value),
    },

    icon: {
      type: String,
      default: null,
    },

    iconRight: {
      type: Boolean,
      default: false,
    },

    to: {
      type: String,
      default: undefined,
    },

    tag: {
      type: String,
      default: 'button',
    },

    type: {
      type: String,
      default: 'button',
    },

    outlined: {
      type: Boolean,
      default: false,
    },

    rounded: {
      type: Boolean,
      default: false,
    },

    glow: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {
      ...useInteractive(),
    }
  },
}
</script>
