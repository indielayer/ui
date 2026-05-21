<script setup lang="ts">
const listItems = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <x-virtual-list
    :row-count="listItems.length"
    :row-height="48"
    class="h-96 rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
  >
    <template #row="{ index, style }">
      <div
        :style="style"
        class="flex h-12 items-center justify-center border-b border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200"
      >
        {{ listItems[index] }}
      </div>
    </template>
  </x-virtual-list>
</template>
