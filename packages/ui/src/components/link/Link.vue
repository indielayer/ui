<template>
  <component
    :is="to ? 'router-link' : tag"
    :to="to"
    class="transition-colors duration-150 ease-in-out cursor-pointer"
    :class="[
      {
        // color
        'hover:text-gray-600 dark:hover:text-gray-300': color === 'gray',
        'text-primary-500 hover:text-primary-600': color === 'primary',
        'text-error-500 hover:text-error-600': color === 'error',
        'text-warning-500 hover:text-warning-600': color === 'warning',
        'text-success-500 hover:text-success-600': color === 'success',
        // underline
        'underline': underline
      },
    ]"
  >
    <span
      v-if="external"
      class="inline-flex items-center"
    >
      <slot></slot>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        role="presentation"
        class="stroke-2 w-4 h-4 ml"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>

<script>
const validator = {
  color: [
    'error',
    'gray',
    'primary',
    'success',
    'warning',
  ],
}

export default {
  name: 'XLink',

  validator,

  props: {
    color: {
      default: 'gray',
      type: String,
      validator: (value) => validator.color.includes(value),
    },

    external: {
      default: false,
      type: Boolean,
    },

    tag: {
      default: 'a',
      type: String,
    },

    to: {
      type: String,
      default: undefined,
    },

    underline: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
