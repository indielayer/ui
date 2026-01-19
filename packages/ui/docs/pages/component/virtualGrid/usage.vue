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
    class="h-96 border border-gray-200 rounded-md bg-white w-full"
  >
    <template #cell="{ rowIndex, columnIndex, style }">
      <div :style="style" class="h-12 flex items-center justify-center border border-gray-200">
        R{{ rowIndex }}, C{{ columnIndex }}
      </div>
    </template>
  </x-virtual-grid>
</template>
