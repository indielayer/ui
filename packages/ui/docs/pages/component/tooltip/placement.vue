<script setup lang="ts">
const placements = ['top', 'bottom', 'left', 'right'] as const
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6 py-6 px-4 max-w-md rounded-lg bg-secondary-50 dark:bg-secondary-900/50">
    <x-tooltip
      v-for="placement in placements"
      :key="placement"
      :position="placement"
      :tooltip="`Tooltip on ${placement}`"
    >
      <x-button outlined class="capitalize min-w-[5rem]">
        {{ placement }}
      </x-button>
    </x-tooltip>
  </div>
</template>
