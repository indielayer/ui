<template>
  <component
    :is="$props.to ? 'router-link' : $props.tag"
    :to="$props.to"
    v-bind="$attrs"
    class="relative leading-tight transition-colors duration-150 cursor-pointer focus:outline-none flex items-center justify-center font-medium"
    :class="[
      {
        // shadow
        'shadow': !$props.flat,
      },
      $props.disabled ?
        // disabled
        'border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
        : {
          // not disabled

          // borders
          'border border-primary-500 dark:border-primary-700 hover:border-primary-600 dark:hover:border-primary-500':
            $props.color === 'primary',
          'border border-secondary-500 dark:border-secondary-700 hover:border-secondary-600 dark:hover:border-secondary-500':
            $props.color === 'secondary',
          'border border-success-500 dark:border-success-700 hover:border-success-600 dark:hover:border-success-500':
            $props.color === 'success',
          'border border-error-500 dark:border-error-700 hover:border-error-600 dark:hover:border-error-500':
            $props.color === 'error',
          'border border-warning-500 dark:border-warning-700 hover:border-warning-600 dark:hover:border-warning-500':
            $props.color === 'warning',
          'border border-gray dark:border-gray-900 hover:border-gray-700 dark:hover:border-gray-500':
            $props.color === 'gray',

          // colors
          'text-primary-50 bg-primary-500':
            $props.color === 'primary' && !$props.outlined,
          'text-secondary-50 bg-secondary-500':
            $props.color === 'secondary' && !$props.outlined,
          'text-success-50 bg-success-500':
            $props.color === 'success' && !$props.outlined,
          'text-error-50 bg-error-500':
            $props.color === 'error' && !$props.outlined,
          'text-warning-50 bg-warning-500':
            $props.color === 'warning' && !$props.outlined,
          'text-gray-50 bg-gray-800':
            $props.color === 'gray' && !$props.outlined,

          'border border-gray-300 dark:border-gray-600': $props.outlined,

          // colors hovers | actives
          'hover:bg-primary-600 active:bg-primary-800':
            $props.color === 'primary' && !$props.loading && !$props.outlined,
          'hover:bg-secondary-600 active:bg-secondary-800':
            $props.color === 'secondary' && !$props.loading && !$props.outlined,
          'hover:bg-success-600 active:bg-success-800':
            $props.color === 'success' && !$props.loading && !$props.outlined,
          'hover:bg-error-600 active:bg-error-800':
            $props.color === 'error' && !$props.loading && !$props.outlined,
          'hover:bg-warning-600 active:bg-warning-800':
            $props.color === 'warning' && !$props.loading && !$props.outlined,
          'hover:bg-gray-700 active:bg-gray-800':
            $props.color === 'gray' && !$props.loading && !$props.outlined,
          'hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600':
            $props.color === 'none' && !$props.loading && $props.outlined,
          'hover:text-gray-500 dark:hover:text-gray-400':
            $props.color === 'none' && !$props.loading && !$props.outlined,
        },
      $slots.default ? {
        // size
        'py-1': $props.size === 'auto',
        'px-2 py-1 text-xs': $props.size === 'xs',
        'px-2 py-1 text-sm': $props.size === 'sm',
        'px-4 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes($props.size),
        'px-6 py-3 text-lg': $props.size === 'lg',
        'px-10 py-6 text-xl': $props.size === 'xl',
      } : 'px-3 py-2',
      {
        // icon
        'inline-flex items-center': $slots.icon || $props.icon,

        // group
        'rounded-button': $props.group === false,
        'rounded-l-button': $props.group === 'first',
        'rounded-r-button': $props.group === 'last',

        '!rounded-full': $props.rounded,

        // loading
        'cursor-default': $props.loading,

        // content
        'flex items-center justify-center': $props.loading,
        'flex-row-reverse': $props.icon && $props.iconRight
      },

    ]"

    :aria-busy="$props.loading ? 'true' : null"
    :aria-disabled="$props.tag !== 'button' && $props.disabled ? 'true' : null"
    :disabled="$props.disabled || $props.loading"
    :type="$props.tag === 'button' ? $props.type : null"
  >
    <x-spinner v-if="$props.loading" :size="$props.size" class="absolute" />
    <span
      v-if="$props.icon"
      class="flex"
      :class="[{
        'mr-2': $slots.default && !$props.iconRight,
        'ml-2': $slots.default && $props.iconRight,
        'invisible': $props.loading
      }]"
    >
      <x-icon :size="$props.size" :icon="$props.icon" />
    </span>
    <span
      :class="{
        'invisible': $props.loading
      }"
    >
      <slot></slot>
    </span>
  </component>
</template>

<script>
const validator = {
  group: [
    false,
    true,
    '',
    'first',
    'last',
  ],
  color: [
    'primary',
    'secondary',
    'success',
    'error',
    'warning',
    'gray',
    'none',
  ],
}

import XSpinner from '../spinner/Spinner.vue'
import XIcon from '../icon/Icon.vue'

export default {
  name: 'XButton',
  components: {
    XSpinner,
    XIcon,
  },

  validator,

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

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

    loading: {
      type: Boolean,
      default: false,
    },

    to: {
      type: String,
      default: undefined,
    },

    size: {
      type: String,
      default: null,
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

    flat: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: 'primary',
      validator: (value) => validator.color.includes(value),
    },
  },
}
</script>
