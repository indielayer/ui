<script setup lang="ts">
import { type TableHeader } from '@indielayer/ui'
import { ref } from 'vue'

const headers: TableHeader[] = [
  { text: '#', value: 'id', sortable: true, align: 'center' },
  { text: 'Title', value: 'title' },
  { text: 'Description', value: 'description' },
  { text: 'Published', value: 'published', sortable: true },
  { text: 'Status', value: 'status' },
]

const items = ref([])
</script>

<template>
  <x-table :headers="headers" :items="items">
    <template #empty>
      <div class="p-4">
        <div class="p-8 border-dashed border rounded-lg text-center">
          Empty state slot
        </div>
      </div>
    </template>
  </x-table>

  <x-table :headers="headers" :items="items" loading/>
</template>
