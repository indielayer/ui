<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'XTableHead',
})
</script>

<template>
  <thead class="align-bottom">
    <tr class="text-sm text-gray-600 dark:text-gray-400 border-b">
      <slot></slot>
    </tr>
  </thead>
</template>
