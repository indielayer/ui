<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    flat: Boolean,
  },
})
</script>

<template>
  <component
    :is="tag"
    class="rounded bg-white dark:bg-gray-800"
    :class="[{ 'shadow': !flat }]"
  >
    <slot></slot>
  </component>
</template>
