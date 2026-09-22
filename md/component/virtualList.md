# VirtualList
Renders only visible rows of a long list for better scroll performance. Use VirtualList for feeds and catalogs with thousands of items.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| class | String |  | CSS class name on the root element. |
| defaultHeight | Number | 0 | Initial list height before measure; important for SSR. |
| onResize | Function as PropType<(       size: { height: number; width: number; |  | Called when the list root resizes. |
| onRowsRendered | Function as PropType<(       visibleRows: { startIndex: number; stopIndex: number; |  | Called when the visible or overscan row range changes. |
| overscanCount | Number | 3 | Extra rows rendered outside the visible area to reduce scroll flicker. |
| rowCount | Number |  | Total number of rows in the list. |
| rowHeight | [Number, String, Function, Object] |  | Row height as px, percent string, function, or `useDynamicRowHeight` cache. |
| rowProps | Object as PropType<Record<string |  | Extra props passed to the row slot as `props`. |
| style | Object CSSProperties |  | Inline styles; the list fills the height defined here. |
| tag | String TagNames | div | Root element tag. |

### Slots
- `default`: Optional content rendered after the virtualized rows.
- `row`: Render a single row. Receives index, style, ariaAttributes, and props.

### Events
- _(none)_

### Methods
- `element`: Root HTML element when mounted, otherwise null.
- `scrollToRow`: Scroll so the given row index is visible.

### Demos
#### Usage
```vue
<script setup lang="ts">
const listItems = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
</script>

<template>
  <x-virtual-list
    :row-count="listItems.length"
    :row-height="48"
    class="h-96 rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
  >
    <template #row="{ index, style }">
      <div
        :style="style"
        class="flex h-12 items-center justify-center border-b border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200"
      >
        {{ listItems[index] }}
      </div>
    </template>
  </x-virtual-list>
</template>
```

#### DynamicHeight
```vue
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
    class="h-[500px] rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
  >
    <template #row="{ index, style }">
      <div
        :style="style"
        :class="[
          'flex cursor-pointer items-start gap-2 border-b border-gray-200 px-4 py-3 transition-colors dark:border-gray-700',
          index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-900',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          isRowCollapsed(index) ? 'overflow-hidden text-ellipsis whitespace-nowrap' : '',
        ]"
        @click="toggleRow(index)"
      >
        <span class="inline-flex h-6 w-6 shrink-0 items-center justify-center text-sm">
          {{ isRowCollapsed(index) ? '➕' : '➖' }}
        </span>
        <span class="flex-1 leading-normal text-gray-800 dark:text-gray-200">
          <strong class="mr-2 text-gray-700 dark:text-gray-300">{{ index }}:</strong>{{ getText(index) }}
        </span>
      </div>
    </template>
  </x-virtual-list>
</template>
```

HTML docs: https://indielayer.com/component/virtualList
