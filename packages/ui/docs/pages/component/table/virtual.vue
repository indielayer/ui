<script setup lang="ts">
import { type TableHeader } from '@indielayer/ui'
import { computed, ref } from 'vue'

const headers: TableHeader[] = [
  { text: '#', value: 'id', sortable: true, align: 'center', width: 50 },
  { text: 'Title', value: 'title', width: 120, truncate: true },
  { text: 'Description', value: 'description', width: 240, truncate: true },
  { text: 'Published', value: 'published', width: 140, truncate: true },
  { text: 'Status', value: 'status' },
  { value: 'action', align: 'right' },
]

const sort = ref([])
const itemsSorted = computed<any[]>(() => {
  const ite = items.value.slice(0)

  return ite.sort((a: any, b: any) => {
    for (const s of sort.value) {
      const [key, asc] = (s as string).split(',')

      if (a[key] > b[key]) return asc === '-1' ? -1 : 1
      if (a[key] < b[key]) return asc === '-1' ? 1 : -1
    }

    return 0
  })
})

function generateItems(x: number) {
  return Array.from({ length: x }, (_, i) => ({
    id: i + 1,
    title: `Book ${i + 1}`,
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, velit.',
    published: Date.now() - x * i,
    status: 'Tag label',
  }))
}

const items = ref(generateItems(1000))
</script>

<template>
  <x-card>
    <x-table
      v-model:sort="sort"
      :headers="headers"
      :items="itemsSorted"
      class="!h-80"
      fixed
      virtual-list
      :virtual-list-item-height="54"
    >
      <template #item-action="{ item }">
        <x-button
          icon="x"
          light
          outlined
          color="error"
          size="xs"
          @click="items = items.filter((i) => i.id !== item.id)"
        />
      </template>
    </x-table>
  </x-card>
</template>
