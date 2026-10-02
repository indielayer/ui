# InfiniteLoader
Loads more list items as the user scrolls near the end of a container. Use InfiniteLoader for feeds and catalogs that grow on demand.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| isRowLoaded | Function (index: number) = boolean> |  | Returns whether the row at the given index is already loaded. |
| loadMoreRows | Function as PropType<(startIndex: number |  | Loads more rows for the given index range; resolve when finished. |
| minimumBatchSize | Number |  | Minimum rows to request per load (default 10). Batches HTTP fetches. |
| rowCount | Number |  | Total row count; may be an upper bound if the true size is unknown. |
| threshold | Number |  | Prefetch when the user scrolls within this many rows of unloaded data (default 15). |

### Slots
- `default`: Render prop slot; receives `onRowsRendered` to wire into a virtual list.

### Events
- _(none)_

### Demos
#### Usage
```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Infinite loader example
const infiniteItems = ref<string[]>([])
const hasMoreData = ref(true)
const isLoading = ref(false)
const highestLoadedIndex = ref(-1)
const apiCursor = ref<string | null>(null) // Cursor from last API call

// Track the actual loaded count
const loadedCount = computed(() => {
  return infiniteItems.value.filter((item) => item !== undefined).length
})

const isRowLoaded = (index: number) => {
  // If loading, pretend ALL rows are loaded to prevent useInfiniteLoader
  // from marking new rows as pending while a request is in progress
  if (isLoading.value) {
    return true
  }

  // The last row is the loading indicator when we have more data
  const isLoadingRow = hasMoreData.value && index === infiniteItems.value.length

  if (isLoadingRow) {
    return false // Not loaded yet, trigger loading
  }

  return infiniteItems.value[index] !== undefined
}

// Helper to get item or loading indicator
const getItem = (index: number) => {
  // If this is the loading indicator row
  if (hasMoreData.value && index === infiniteItems.value.length) {
    return isLoading.value ? '⏳ Loading more...' : '↓ Scroll for more'
  }

  return infiniteItems.value[index]
}

const loadMoreRows = async (startIndex: number, stopIndex: number) => {
  // Block all new requests if one is already in progress
  if (isLoading.value) {
    console.log(`[loadMoreRows] Already loading, rejecting request for ${startIndex}-${stopIndex}`)

    return
  }

  isLoading.value = true
  const currentLength = infiniteItems.value.length

  console.log(`[loadMoreRows] Loading batch of 50 items, cursor: ${apiCursor.value}, current items: ${currentLength}`)

  try {
    // Simulate API call with cursor
    // In real implementation: const response = await fetch(`/api/items?cursor=${apiCursor.value}&limit=50`);
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you'd use the cursor and response data:
    // const response = await fetch(`/api/items?cursor=${apiCursor.value}&limit=50`);
    // const { items, nextCursor, hasMore } = await response.json();
    // apiCursor.value = nextCursor;
    // hasMoreData.value = hasMore;
    //
    // Then append the items from the API:
    // const newItems = [...infiniteItems.value, ...items];
    // infiniteItems.value = newItems;

    // Simulate API response: generate 50 items
    const batchSize = 50
    const itemsToAdd = []

    for (let i = 0; i < batchSize; i++) {
      const itemIndex = currentLength + i

      itemsToAdd.push(`Item ${itemIndex + 1}`)
      if (itemIndex > highestLoadedIndex.value) {
        highestLoadedIndex.value = itemIndex
      }
    }

    // Simulate updating cursor based on response
    apiCursor.value = `cursor_after_${currentLength + batchSize - 1}`

    // Append all new items at once
    infiniteItems.value = [...infiniteItems.value, ...itemsToAdd]

    console.log(`[loadMoreRows] Loaded ${batchSize} items, total: ${infiniteItems.value.length}, cursor: ${apiCursor.value}`)

    // Check if we've reached the limit (simulate end of data)
    if (infiniteItems.value.length >= 500) {
      hasMoreData.value = false
      console.log('[loadMoreRows] Reached limit, no more data to load')
    }
  } catch (error) {
    console.error('[loadMoreRows] Error loading items:', error)
  } finally {
    isLoading.value = false
  }
}

const infiniteRowCount = computed(() => {
  const itemsLength = infiniteItems.value.length

  if (!hasMoreData.value) {
    // No more data, show only loaded items
    return itemsLength
  }

  // Show loaded items + 1 loading indicator row
  return itemsLength + 1
})

// Load first batch of items on mount or when switching to infinite tab
const loadInitialItems = async () => {
  if (infiniteItems.value.length === 0) {
    await loadMoreRows(0, 49) // Indices are ignored, always loads 50 items
  }
}

onMounted(() => {
  loadInitialItems()
})
</script>

<template>
  <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
    Loaded {{ loadedCount }} of {{ infiniteRowCount }} items
    <span v-if="isLoading" class="text-gray-500 dark:text-gray-300"> (Loading...)</span>
  </p>
  <x-infinite-loader
    :is-row-loaded="isRowLoaded"
    :load-more-rows="loadMoreRows"
    :row-count="infiniteRowCount"
    :minimum-batch-size="50"
    :threshold="10"
  >
    <template #default="{ onRowsRendered }">
      <x-virtual-list
        :row-count="infiniteRowCount"
        :row-height="50"
        class="h-96 rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
        :on-rows-rendered="onRowsRendered"
      >
        <template #row="{ index, style }">
          <div
            :style="style"
            :class="[
              'flex h-12 items-center justify-center border-b border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200',
              index === infiniteItems.length && hasMoreData
                ? 'bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400'
                : '',
            ]"
          >
            {{ getItem(index) }}
          </div>
        </template>
      </x-virtual-list>
    </template>
  </x-infinite-loader>
</template>
```

#### Composable
```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useInfiniteLoader } from '@indielayer/ui'

// Infinite loader example
const infiniteItems = ref<string[]>([])
const hasMoreData = ref(true)
const isLoading = ref(false)
const highestLoadedIndex = ref(-1)
const apiCursor = ref<string | null>(null) // Cursor from last API call

// Track the actual loaded count
const loadedCount = computed(() => {
  return infiniteItems.value.filter((item) => item !== undefined).length
})

const isRowLoaded = (index: number) => {
  // If loading, pretend ALL rows are loaded to prevent useInfiniteLoader
  // from marking new rows as pending while a request is in progress
  if (isLoading.value) {
    return true
  }

  // The last row is the loading indicator when we have more data
  const isLoadingRow = hasMoreData.value && index === infiniteItems.value.length

  if (isLoadingRow) {
    return false // Not loaded yet, trigger loading
  }

  return infiniteItems.value[index] !== undefined
}

// Helper to get item or loading indicator
const getItem = (index: number) => {
  // If this is the loading indicator row
  if (hasMoreData.value && index === infiniteItems.value.length) {
    return isLoading.value ? '⏳ Loading more...' : '↓ Scroll for more'
  }

  return infiniteItems.value[index]
}

const loadMoreRows = async (startIndex: number, stopIndex: number) => {
  // Block all new requests if one is already in progress
  if (isLoading.value) {
    console.log(`[loadMoreRows] Already loading, rejecting request for ${startIndex}-${stopIndex}`)

    return
  }

  isLoading.value = true
  const currentLength = infiniteItems.value.length

  console.log(`[loadMoreRows] Loading batch of 50 items, cursor: ${apiCursor.value}, current items: ${currentLength}`)

  try {
    // Simulate API call with cursor
    // In real implementation: const response = await fetch(`/api/items?cursor=${apiCursor.value}&limit=50`);
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you'd use the cursor and response data:
    // const response = await fetch(`/api/items?cursor=${apiCursor.value}&limit=50`);
    // const { items, nextCursor, hasMore } = await response.json();
    // apiCursor.value = nextCursor;
    // hasMoreData.value = hasMore;
    //
    // Then append the items from the API:
    // const newItems = [...infiniteItems.value, ...items];
    // infiniteItems.value = newItems;

    // Simulate API response: generate 50 items
    const batchSize = 50
    const itemsToAdd = []

    for (let i = 0; i < batchSize; i++) {
      const itemIndex = currentLength + i

      itemsToAdd.push(`Item ${itemIndex + 1}`)
      if (itemIndex > highestLoadedIndex.value) {
        highestLoadedIndex.value = itemIndex
      }
    }

    // Simulate updating cursor based on response
    apiCursor.value = `cursor_after_${currentLength + batchSize - 1}`

    // Append all new items at once
    infiniteItems.value = [...infiniteItems.value, ...itemsToAdd]

    console.log(`[loadMoreRows] Loaded ${batchSize} items, total: ${infiniteItems.value.length}, cursor: ${apiCursor.value}`)

    // Check if we've reached the limit (simulate end of data)
    if (infiniteItems.value.length >= 500) {
      hasMoreData.value = false
      console.log('[loadMoreRows] Reached limit, no more data to load')
    }
  } catch (error) {
    console.error('[loadMoreRows] Error loading items:', error)
  } finally {
    isLoading.value = false
  }
}

const infiniteRowCount = computed(() => {
  const itemsLength = infiniteItems.value.length

  if (!hasMoreData.value) {
    // No more data, show only loaded items
    return itemsLength
  }

  // Show loaded items + 1 loading indicator row
  return itemsLength + 1
})

const { onRowsRendered } = useInfiniteLoader(
  computed(() => {
    const rc = infiniteRowCount.value

    console.log(`[useInfiniteLoader] Props updated - rowCount: ${rc}, loaded: ${loadedCount.value}`)

    return {
      isRowLoaded,
      loadMoreRows,
      rowCount: rc,
      minimumBatchSize: 50, // Load 50 items per batch
      threshold: 10, // Start loading when within 10 rows of needing data
    }
  }),
)

// Load first batch of items on mount or when switching to infinite tab
const loadInitialItems = async () => {
  if (infiniteItems.value.length === 0) {
    await loadMoreRows(0, 49) // Indices are ignored, always loads 50 items
  }
}

onMounted(() => {
  loadInitialItems()
})
</script>

<template>
  <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
    Loaded {{ loadedCount }} of {{ infiniteRowCount }} items
    <span v-if="isLoading" class="text-gray-500 dark:text-gray-300"> (Loading...)</span>
  </p>
  <x-virtual-list
    :row-count="infiniteRowCount"
    :row-height="50"
    class="h-96 rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
    :on-rows-rendered="onRowsRendered"
  >
    <template #row="{ index, style }">
      <div
        :style="style"
        :class="[
          'flex h-12 items-center justify-center border-b border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200',
          index === infiniteItems.length && hasMoreData
            ? 'bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400'
            : '',
        ]"
      >
        {{ getItem(index) }}
      </div>
    </template>
  </x-virtual-list>
</template>
```

HTML docs: https://indielayer.com/component/infiniteLoader
