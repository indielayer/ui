<script setup lang="ts">
const listItems = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <x-virtual-list
    :row-count="listItems.length"
    :row-height="48"
    class="h-96 border border-gray-200 rounded-md bg-white"
  >
    <template #row="{ index, style }">
      <div :style="style" class="h-12 flex items-center justify-center border-b border-gray-200">
        {{ listItems[index] }}
      </div>
    </template>
  </x-virtual-list>
</template>
