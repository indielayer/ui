<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="inline-flex items-center justify-center overflow-hidden"
    :class="[
      // color
      !$props.src ? {
        'bg-blue-500 text-blue-50': $props.color === 'blue',
        'bg-gray-500 text-gray-50': $props.color === 'gray',
        'bg-green-500 text-green-50': $props.color === 'green',
        'bg-indigo-500 text-indigo-50': $props.color === 'indigo',
        'bg-pink-500 text-pink-50': $props.color === 'pink',
        'bg-primary-500 text-primary-50': $props.color === 'primary',
        'bg-purple-500 text-purple-50': $props.color === 'purple',
        'bg-red-500 text-red-50': $props.color === 'red',
        'bg-yellow-500 text-yellow-50': $props.color === 'yellow',
      } : {},
      {
        // size
        'h-6 w-6 text-xs': $props.size === 'xs',
        'h-7 w-7 text-sm': $props.size === 'sm',
        'h-10 w-10': !['xs', 'sm', 'lg', 'xl'].includes($props.size),
        'h-12 w-12 text-lg': $props.size === 'lg',
        'h-20 w-20 text-2xl': $props.size === 'xl',
        'h-36 w-36 text-2xl': $props.size === '2xl',

        // variant
        'rounded-full': $props.variant === 'rounded',
        'rounded-md': $props.variant === 'squared',
      },
    ]"
  >
    <span
      v-if="!$props.src && $props.name"
      class="leading-none"
    >{{ $options.initials($props.name) }}</span>

    <img
      v-if="$props.src"
      :alt="$props.alt"
      :src="$props.src"
      class="h-full w-full"
    />
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
    'purple',
    'red',
    'yellow',
  ],
  variant: [
    'rounded',
    'squared',
  ],
}

export default {
  name: 'XAvatar',

  validator,

  initials(name) {
    if (name) {
      const initials = name.match(/\b\w/g) || []

      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }

    return ''
  },

  props: {
    alt: {
      default: null,
      type: String,
    },

    color: {
      default: 'primary',
      type: String,
      validator: (value) => validator.color.includes(value),
    },

    name: {
      default: null,
      type: String,
    },

    size: {
      default: null,
      type: String,
    },

    src: {
      default: null,
      type: String,
    },

    tag: {
      default: 'span',
      type: String,
    },

    variant: {
      default: 'rounded',
      type: String,
      validator: (value) => validator.variant.includes(value),
    },
  },
}
</script>
