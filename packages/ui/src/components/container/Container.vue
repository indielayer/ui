<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
    class="container mx-auto px-4"
  >
    <slot></slot>
  </component>
</template>
