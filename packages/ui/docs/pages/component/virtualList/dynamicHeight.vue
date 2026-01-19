<script setup lang="ts">
import { ref } from 'vue'
import { XVirtualList, useDynamicRowHeight } from '@indielayer/ui'

const loremTexts = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  'Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
  'Lorem ipsum dolor sit amet.',
  'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
]

const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  text: loremTexts[i % loremTexts.length],
}))

const collapsedRows = ref<Set<number>>(new Set())

const toggleRow = (index: number) => {
  const newSet = new Set(collapsedRows.value)

  if (newSet.has(index)) {
    newSet.delete(index)
  } else {
    newSet.add(index)
  }
  collapsedRows.value = newSet
}

const isRowCollapsed = (index: number) => {
  return collapsedRows.value.has(index)
}

const getText = (index: number) => {
  return items[index].text
}

const rowHeight = useDynamicRowHeight({
  defaultRowHeight: 50,
})
</script>

<template>
  <x-virtual-list
    :row-count="items.length"
    :row-height="rowHeight"
    style="height: 500px; border: 1px solid #ccc;"
  >
    <template #row="{ index, style }">
      <div
        :style="style"
        :class="[
          'flex items-start py-3 px-4 border-b border-gray-200 cursor-pointer transition-colors gap-2',
          index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
          'hover:bg-gray-200',
          isRowCollapsed(index) ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''
        ]"
        @click="toggleRow(index)"
      >
        <span class="flex-shrink-0 w-6 h-6 inline-flex items-center justify-center text-sm">
          {{ isRowCollapsed(index) ? '➕' : '➖' }}
        </span>
        <span class="flex-1 leading-normal">
          <strong class="text-gray-700 mr-2">{{ index }}:</strong>{{ getText(index) }}
        </span>
      </div>
    </template>
  </x-virtual-list>
</template>
