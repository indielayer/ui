<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="inline-block leading-none"
    :class="
      [
        {
          // variant
          '!bg-transparent border': $props.outlined,

          // color
          'bg-blue-200 text-blue-900 border-blue-900': $props.color === 'blue',
          'bg-gray-200 text-gray-900 border-gray-900': $props.color === 'gray',
          'bg-green-200 text-green-900 border-green-900': $props.color === 'green',
          'bg-indigo-200 text-indigo-900 border-indigo-900': $props.color === 'indigo',
          'bg-pink-200 text-pink-900 border-pink-900': $props.color === 'pink',
          'bg-primary-200 text-primary-900 border-primary-900': $props.color === 'primary',
          'bg-secondary-200 text-secondary-900 border-secondary-900': $props.color === 'secondary',
          'bg-purple-200 text-purple-900 border-purple-900': $props.color === 'purple',
          'bg-red-200 text-red-900 border-red-900': $props.color === 'red',
          'bg-yellow-200 text-yellow-900 border-yellow-900': $props.color === 'yellow',

          // size
          'py-1': $props.size === 'auto',
          'px-2 py-1 text-xs': $props.size === 'xs',
          'px-2 py-1 text-sm': $props.size === 'sm',
          'px-3 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes($props.size),
          'px-4 py-3 text-lg': $props.size === 'lg',
          'px-6 py-6 text-xl': $props.size === 'xl',

          // radius
          'rounded-full': $props.radius === 'full',
          'rounded-lg': $props.radius === 'lg',
          'rounded-md': $props.radius === 'md',
          'rounded-sm': $props.radius === 'sm',
          'rounded': $props.radius === 'rounded',
        },
      ]"
  >
    <span
      v-if="$props.removable"
      class="flex items-center"
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
        class="stroke-2 w-4 h-4 ml-1 cursor-pointer hover:text-gray-700 transition-colors duration-150 ease-in-out"
        v-on="listeners.remove ? { click: listeners.remove } : null"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
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
    'blue',
    'gray',
    'green',
    'indigo',
    'pink',
    'primary',
    'secondary',
    'purple',
    'red',
    'yellow',
  ],
}

export default {
  name: 'XTag',

  validator,

  props: {
    color: {
      type: String,
      default: 'gray',
      validator: (value) => validator.color.includes(value),
    },

    radius: {
      type: String,
      default: 'full',
    },

    removable: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: null,
    },

    tag: {
      type: String,
      default: 'span',
    },

    outlined: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
