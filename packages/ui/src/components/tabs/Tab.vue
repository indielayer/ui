<template>
  <component
    :is="$props.to ? 'router-link' : $props.tag"
    v-bind="$attrs"
    :to="$props.to"
    class="pb-2 transition-colors duration-150 ease-in-out"
    :class="[
      {
        'border-b-2 border-primary-500 text-primary-500': $props.selected,
        'hover:text-primary-500': !$props.disabled,
        'cursor-pointer': !$props.disabled,
        'cursor-not-allowed': $props.disabled,
        'cursor-not-allowed text-gray-500': $props.disabled && !$props.selected,
      },
    ]"
    :aria-disabled="$props.disabled ? 'true' : null"
    :aria-selected="$props.selected ? 'true' : 'false'"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'XTab',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    selected: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: 'li',
    },

    to: {
      type: String,
      default: undefined,
    },
  },
}
</script>
