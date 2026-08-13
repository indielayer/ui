<template>
  <x-tooltip position="bottom">
    <x-button color="primary">Hover for details</x-button>
    <template #tooltip>
      <div class="font-semibold text-white mb-1">Export report</div>
      <div class="text-secondary-300 text-xs leading-relaxed max-w-[14rem]">
        Download a CSV snapshot of the current filters. Large exports may take a few seconds.
      </div>
    </template>
  </x-tooltip>
</template>
