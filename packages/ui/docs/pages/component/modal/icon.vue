<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const showSlot = ref(false)

// Same path used by XEmpty's default icon (archive box).
const archiveIcon = '<path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />'
</script>

<template>
  <x-modal
    v-model="show"
    title="No results"
    label="Search"
    :icon="archiveIcon"
    show-close
    backdrop
    size="sm"
  >
    Nothing matched these filters. Try widening your search or clearing filters.

    <template #secondary-action>
      <x-button ghost @click="show = false">Close</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" @click="show = false">Clear filters</x-button>
    </template>
  </x-modal>

  <x-modal
    v-model="showSlot"
    title="Confirm Deletion"
    show-close
    backdrop
    size="sm"
  >
    <template #icon>
      <x-icon
        icon="trash"
        size="sm"
        class="text-error-500"
      />
    </template>

    Use the icon slot when you need a custom color or markup inside the wrapper.

    <template #secondary-action>
      <x-button ghost @click="showSlot = false">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="error" @click="showSlot = false">Delete</x-button>
    </template>
  </x-modal>

  <x-button class="mr-2" @click="show = true">icon prop</x-button>
  <x-button class="mr-2" @click="showSlot = true">icon slot</x-button>
</template>
