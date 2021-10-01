<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="animate-pulse bg-gray-300 dark:bg-gray-600"
    :class="[
      $props.rounded ? 'rounded-full' : 'rounded-sm',
    ]"
  >
    &#8203;
  </component>
</template>

<script>
export default {
  name: 'XSkeleton',

  props: {
    rounded: {
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
