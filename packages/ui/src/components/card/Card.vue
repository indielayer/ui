<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="rounded bg-white dark:bg-gray-800"
    :class="[
      {
        'shadow': !$props.flat,
      },
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'XCard',
  props: {
    flat: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>
