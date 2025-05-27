<script setup lang="ts">
import { ref } from 'vue'
import { type TableHeader } from '@indielayer/ui'

const headers: TableHeader[] = [
  { text: '#', value: 'id', align: 'center' },
  { text: 'Title', value: 'title' },
  { text: 'Description', value: 'description', truncate: true, width: 400 },
  { text: 'Published', value: 'published', align: 'center' },
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

const selected = ref<number[]>([])
const singleSelected = ref<number>(2)
</script>

<template>
  <div class="grid gap-4">
    <x-card>
      <x-table
        v-model:selected="selected"
        selectable
        :headers="headers"
        :items="items"
      />
    </x-card>
    <x-card>
      <x-table
        v-model:selected="singleSelected"
        key-prop="id"
        selectable
        pointer
        single-select
        :headers="headers"
        :items="items"
      />
    </x-card>
  </div>
</template>