<script setup lang="ts">
import { ref } from 'vue'
import type { MenuArrayItem } from '@indielayer/ui'

const open = ref(false)

const items: MenuArrayItem[] = [{
  label: 'Edit',
  icon: 'edit',
  onClick: () => { open.value = false },
}, {
  label: 'Duplicate',
  icon: 'copy',
  onClick: () => { open.value = false },
}, {
  divider: true,
}, {
  label: 'Delete',
  icon: 'trash',
  color: 'error',
  onClick: () => { open.value = false },
}]
</script>

<template>
  <x-popover
    v-model:shown="open"
    placement="bottom-start"
  >
    <x-button icon-right="chevron-down">
      Actions
    </x-button>
    <template #content>
      <x-popover-container class="w-48 p-1">
        <x-menu
          size="sm"
          :items="items"
        />
      </x-popover-container>
    </template>
  </x-popover>
</template>
