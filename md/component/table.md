# Table
Tables display tabular data with single- or multi-column sorting, selection, expandable rows, and virtual lists.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| autoClearSelected | Boolean | true | Clears selection entries that no longer exist in `items`. |
| dense | Boolean |  | Compact cell padding. |
| error | Boolean |  | Shows the error slot instead of rows. |
| expandable | Boolean |  | Adds an expand control and `expanded-row` slot per row. |
| fixed | Boolean |  | Fixed table layout for consistent column widths. |
| headers | Array TableHeader[] | [] | Column definitions (text, value, sortable, align, width, etc.). |
| hrefFn | Function (item: unknown) = string> |  | Returns an href to make each cell an anchor. |
| hrefTarget | String '_blank'  \|  '_self'  \|  '_parent'  \|  '_top' |  | Target for links created by `hrefFn`. |
| items | Array | [] | Row data array. Cell values resolve from each header `value` path. |
| keyProp | String |  | Item property used as the stable row key (falls back to index). |
| loading | Boolean |  | Shows loading rows (skeletons) and a spinner overlay. |
| loadingLines | [Number, String] | 3 | Number of skeleton rows shown while loading. |
| loadingSkeleton | Boolean |  | When set, loading rows use skeleton placeholders. |
| pointer | Boolean |  | Pointer cursor on rows (also set when `toFn` or `hrefFn` is used). |
| scrollable | Boolean | true | Enables horizontal overflow scrolling for wide tables. |
| selectable | Boolean |  | Enables row selection (`v-model:selected`). |
| singleSelect | Boolean |  | Select only one row at a time. |
| sort | Array string[] | [] | Active sort entries as `column,-1\|1` (use with `v-model:sort`). |
| sortMultiple | Boolean |  | Allow sorting by multiple columns at once. |
| stickyHeader | Boolean | true | Keeps the header row sticky while scrolling. |
| striped | Boolean |  | Alternating row background colors. |
| toFn | Function (item: unknown) = string  \|  Record<string |  | Returns a Vue Router location to make each cell a link. |
| virtualList | Boolean |  | Virtualizes rows for large datasets. |
| virtualListItemHeight | Number | 54 | Fixed row height (px) for virtual list measurement. |
| virtualListOffsetBottom | Number |  | Bottom spacer offset (px) when using virtual list. |
| virtualListOffsetTop | Number |  | Top spacer offset (px) when using virtual list. |
| virtualListOverscan | Number | 10 | Extra rows rendered above/below the viewport when virtualized. |

### Slots
- `actions`: Optional actions above the table.
- `default`
- `empty`: Content when there are no items.
- `error`: Content when `error` is true.
- `expanded-row`: Expanded content for a row when `expandable` is set.
- `footer`: Custom footer (`tfoot`); overrides per-column footer slots when provided.
- `footer-[column]`: Footer cell content for a column (`footer-{value}`).
- `header-[column]`: Header cell content for a column (`header-{value}`).
- `item-[column]`: Cell content for a column (`item-{value}`).
- `loading-[column]`: Loading cell content for a column (`loading-{value}`).
- `title`: Optional title above the table.

### Events
- `click-row`: Emitted when a row is clicked; payload is `(item, index)`.
- `update:selected`: Emitted when selection changes (`v-model:selected`).
- `update:sort`: Emitted when sort changes (`v-model:sort`).

### Demos
#### Usage
```vue
<script setup lang="ts">
import { useNotifications, type TableHeader } from '@indielayer/ui'
import { computed, ref } from 'vue'

const notifications = useNotifications()

const headers: TableHeader[] = [
  { text: '#', value: 'id', sortable: true, align: 'center' },
  { text: 'Title', value: 'title' },
  { text: 'Description', value: 'description', truncate: true, width: 400 },
  { text: 'Published', value: 'published', sortable: true, tooltip: 'Published date', align: 'center' },
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

        <template #footer>
          <tfoot>
            <tr>
              <td colspan="6" class="text-center py-2">
                <p class="text-sm text-gray-500 font-medium">
                  Footer content
                </p>
              </td>
            </tr>
          </tfoot>
        </template>
      </x-table>
    </x-card>

    <x-card>
      <x-table
        v-model:sort="sort"
        key-prop="id"
        dense
        pointer
        striped
        :headers="headers"
        :items="itemsSorted"
        @click-row="(event, index) => { notifications?.log(event); }"
      >
        <template #item-published="{ item }">
          {{ formatDate(item.published) }}
        </template>
      </x-table>
    </x-card>
  </div>
</template>
```

#### Selectable
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { type TableHeader } from '@indielayer/ui'

const headers: TableHeader[] = [
  { text: '#', value: 'id' },
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
        @click-row="(item) => console.log('Row clicked:', item)"
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
```

#### States
```vue
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
        <x-empty
          bordered
          title="No data"
          description="There are no rows to display."
        />
      </div>
    </template>
  </x-table>

  <x-table :headers="headers" :items="items" loading/>
</template>
```

#### Virtual
```vue
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
const selected = ref<number[]>([])
</script>

<template>
  <x-card>
    <x-table
      v-model:sort="sort"
      v-model:selected="selected"
      :headers="headers"
      :items="itemsSorted"
      class="!h-80"
      fixed
      virtual-list
      :to-fn="(item: any) => `/books/${item.id}`"
      :virtual-list-item-height="44"
      selectable
    >
      <template #item-action="{ item }">
        <x-button
          icon="x"
          light
          outlined
          color="error"
          size="xs"
          @click.stop.prevent="items = items.filter((i) => i.id !== item.id)"
        />
      </template>
    </x-table>
  </x-card>
</template>
```

HTML docs: https://indielayer.com/component/table
