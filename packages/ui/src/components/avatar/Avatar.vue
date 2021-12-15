<template>
  <component
    :is="tag"
    class="inline-flex items-center justify-center overflow-hidden"
    :class="[
      // color
      { [`bg-${color}-500 text-${color}-50`]: !source && !outlined },
      {
        // border
        'border border-gray-400 dark:border-gray-500': !source && outlined,

        // size
        'h-6 w-6 text-xs': size === 'xs',
        'h-7 w-7 text-sm': size === 'sm',
        'h-10 w-10': !['xs', 'sm', 'lg', 'xl'].includes(size),
        'h-12 w-12 text-lg': size === 'lg',
        'h-20 w-20 text-2xl': size === 'xl',
        'h-36 w-36 text-2xl': size === '2xl',
      },
      squared ? 'rounded-md' : 'rounded-full'
    ]"
  >
    <span
      v-if="!source && name"
      class="leading-none"
    >{{ initials }}</span>

    <img
      v-if="source"
      :alt="alt"
      :src="src"
      class="h-full w-full"
    />
  </component>
</template>

<script>
const validator = {
  variant: [
    'rounded',
    'squared',
  ],
}

export default {
  name: 'XAvatar',

  validator,

  props: {
    alt: {
      type: String,
      default: null,
    },

    color: {
      type: String,
      default: 'primary',
    },

    name: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: null,
    },

    outlined: {
      type: Boolean,
      default: false,
    },

    src: {
      type: String,
      default: null,
    },

    tag: {
      type: String,
      default: 'span',
    },

    squared: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      source: null,
    }
  },

  computed: {
    initials() {
      if (this.name) {
        const initials = this.name.match(/\b\w/g) || []

        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      }

      return ''
    },
  },

  mounted() {
    if (this.src) {
      const img = new Image()

      img.onload = () => { this.source = this.src }
      img.onerror = () => { }
      img.src = this.src
    }
  },
}
</script>
