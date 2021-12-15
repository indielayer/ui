<template>
  <component
    :is="tag"
    class="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-md"
  >
    &#8203;
  </component>
</template>

<script>
export default {
  name: 'XSkeleton',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>
