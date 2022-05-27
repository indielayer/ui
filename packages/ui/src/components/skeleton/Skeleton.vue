<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'XSkeleton',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
})
</script>

<template>
  <component
    :is="tag"
    class="animate-pulse bg-gray-300 dark:bg-gray-600 rounded-md"
  >
    &#8203;
  </component>
</template>
