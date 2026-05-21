<script setup lang="ts">
const gridRowCount = 1000
const gridColumnCount = 1000
</script>

<template>
  <x-virtual-grid
    :row-count="gridRowCount"
    :column-count="gridColumnCount"
    :row-height="48"
    :column-width="100"
    class="h-96 w-full rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
  >
    <template #cell="{ rowIndex, columnIndex, style }">
      <div
        :style="style"
        class="flex h-12 items-center justify-center border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200"
      >
        R{{ rowIndex }}, C{{ columnIndex }}
      </div>
    </template>
  </x-virtual-grid>
</template>
