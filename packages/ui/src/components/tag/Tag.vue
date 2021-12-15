<template>
  <component
    :is="tag"
    class="inline-block leading-none"
    :class="
      [
        [`bg-${color}-200 text-${color}-900 border-${color}-900`],
        {
          // variant
          '!bg-transparent border': outlined,

          // size
          'py-1': size === 'auto',
          'px-2 py-1 text-xs': size === 'xs',
          'px-2 py-1 text-sm': size === 'sm',
          'px-3 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
          'px-4 py-3 text-lg': size === 'lg',
          'px-6 py-6 text-xl': size === 'xl',

          // radius
          'rounded-full': radius === 'full',
          'rounded-lg': radius === 'lg',
          'rounded-md': radius === 'md',
          'rounded-sm': radius === 'sm',
          'rounded': radius === 'rounded',
        },
      ]"
  >
    <span
      v-if="removable"
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
        class="stroke-2 w-4 h-4 ml-1 cursor-pointer hover:text-gray-700 transition-colors duration-150 ease-in-out flex-shrink-0"
        @click="$emit('remove')"
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
export default {
  name: 'XTag',

  props: {
    color: {
      type: String,
      default: 'gray',
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
