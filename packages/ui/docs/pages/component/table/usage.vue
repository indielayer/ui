<script setup lang="ts">
import { useNotifications, type TableHeader } from '@indielayer/ui'
import { computed, ref } from 'vue'

const notifications = useNotifications('notifica')

const headers: TableHeader[] = [
  { text: '#', value: 'id', sortable: true, align: 'center' },
  { text: 'Title', value: 'title' },
  { text: 'Description', value: 'description', truncate: true, width: 400 },
  { text: 'Published', value: 'published', sortable: true },
  { text: 'Status', value: 'status' },
]

type Book = {
  id: number;
  title: string;
  description: string;
  published: number;
  status: string;
}

const items = ref<Book[]>([{
  id: 1,
  title: 'Book of Magic',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, velit.',
  published: Date.now() - 1000,
  status: 'Tag label',
}, {
  id: 2,
  title: 'Another book',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, velit.',
  published: Date.now() - 5000,
  status: 'Tag label',
}, {
  id: 3,
  title: 'Clever cove',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, velit.',
  published: Date.now() - 3000,
  status: 'Tag label',
}])

const sort = ref([])

function formatDate(val: any) {
  return (new Date(val)).toISOString()
}

const itemsSorted = computed<Book[]>(() => {
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
</script>

<template>
  <div class="grid gap-4">
    <x-card>
      <x-table
        v-model:sort="sort"
        expandable
        :headers="headers"
        :items="itemsSorted"
      >
        <template #expanded-row="{ item }">
          {{ item }}
        </template>

        <template #item-published="{ item }">
          {{ formatDate(item.published) }}
        </template>
        <template #item-status="{ item }">
          <x-tag size="xs" color="primary" rounded>{{ item.status }}</x-tag>
        </template>
      </x-table>
    </x-card>

    <x-card>
      <x-table
        v-model:sort="sort"
        dense
        striped
        :headers="headers"
        :items="itemsSorted"
        @click-row="notifications?.log('open')"
      >
        <template #item-published="{ item }">
          {{ formatDate(item.published) }}
        </template>
      </x-table>
    </x-card>
  </div>
</template>
