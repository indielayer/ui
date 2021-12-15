<template>
  <component
    :is="tag"
    class="px-2 py-1 block rounded transition-colors duration-100 ease-in-out whitespace-nowrap"
    :class="[
      {
        'flex items-center': $slots.prefix || $slots.suffix,
        'hover:bg-gray-100 dark:hover:bg-gray-800': variant === 'base' && !disabled,
        'hover:text-error-500 hover:bg-error-50': variant === 'error' && !disabled,
        'opacity-70': disabled,
        'cursor-pointer': !disabled,
      },

    ]"
  >
    <span
      v-if="$slots.prefix"
      class="inline-flex items-center mr-2"
    >
      <slot name="prefix"></slot>
    </span>
    <span :class="{ 'flex-1': $slots.prefix || $slots.suffix }">
      <slot></slot>
    </span>
    <span
      v-if="$slots.suffix"
      class="inline-flex items-center ml-1"
    >
      <slot name="suffix"></slot>
    </span>
  </component>
</template>

<script>
const validator = {
  variant: [
    'base',
    'error',
  ],
}

export default {
  name: 'XPopoverItem',

  validator,

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },

    variant: {
      default: 'base',
      type: String,
      validator: (value) => validator.variant.includes(value),
    },

    tag: {
      default: 'div',
      type: String,
    },
  },
}
</script>
