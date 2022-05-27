<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'XPopoverContainer',

  props: {
    tag: {
      default: 'div',
      type: String,
    },
  },
})
</script>

<template>
  <component
    :is="tag"
    class="block w-full bg-white dark:bg-gray-700 shadow-lg rounded-md border  border-gray-200 dark:border-gray-800"
  >
    <slot></slot>
  </component>
</template>
