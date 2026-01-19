# Indielayer - Virtual Vue

Vue 3 port of [react-window](https://github.com/bvaughn/react-window) - Efficient virtualized list and grid components using the Composition API.

## Overview

High-performance virtualized list and grid components for Vue 3 applications. It renders only the visible items in large datasets, dramatically improving performance when dealing with thousands of rows or cells.

## Quick Start

### List Example

```vue
<script setup lang="ts">
import { XVirtualList } from '@indielayer/ui'

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)
</script>

<template>
  <XVirtualList
    :row-count="items.length"
    :row-height="50"
    :style="{ height: '400px' }"
  >
    <template #row="{ index, style }">
      <div :style="style" class="row">
        {{ items[index] }}
      </div>
    </template>
  </XVirtualList>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #eee;
}
</style>
```

### Grid Example

```vue
<script setup lang="ts">
import { XVirtualGrid } from '@indielayer/ui'
</script>

<template>
  <XVirtualGrid
    :row-count="1000"
    :column-count="1000"
    :row-height="50"
    :column-width="100"
    :style="{ height: '500px', width: '800px' }"
  >
    <template #cell="{ rowIndex, columnIndex, style }">
      <div :style="style" class="cell">
        Row {{ rowIndex }}, Col {{ columnIndex }}
      </div>
    </template>
  </XVirtualGrid>
</template>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
}
</style>
```

## Features

- ⚡️ **Virtual scrolling** - Only renders visible items
- 📏 **Variable sizes** - Fixed, variable, or dynamic item sizes  
- 📐 **Dynamic measurement** - Automatic height measurement with `useDynamicRowHeight`
- 🌐 **RTL support** - Right-to-left language support
- 🖥️ **SSR compatible** - Works with server-side rendering
- 📝 **TypeScript** - Full type definitions included
- 🎯 **Imperative API** - Programmatic scrolling via template refs
- ♿️ **ARIA support** - Accessibility attributes built-in
- 🔄 **Overscan** - Render extra items to reduce flicker
- ♾️ **Infinite loading** - Built-in support for infinite scroll/pagination

## Components & Composables

### List

Virtualized list component for rendering large datasets with many rows.

```vue
<script setup lang="ts">
import { XVirtualList } from '@indielayer/ui'

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`)
</script>

<template>
  <XVirtualList
    :row-count="items.length"
    :row-height="50"
    :style="{ height: '400px' }"
  >
    <template #row="{ index, style }">
      <div :style="style">
        {{ items[index] }}
      </div>
    </template>
  </XVirtualList>
</template>
```

### Grid

Virtualized grid component for rendering data with rows and columns.

```vue
<script setup lang="ts">
import { XVirtualGrid } from '@indielayer/ui'

const rowCount = 1000
const columnCount = 1000
</script>

<template>
  <XVirtualGrid
    :row-count="rowCount"
    :column-count="columnCount"
    :row-height="50"
    :column-width="100"
    :style="{ height: '400px', width: '600px' }"
  >
    <template #cell="{ rowIndex, columnIndex, style }">
      <div :style="style">
        Row {{ rowIndex }}, Col {{ columnIndex }}
      </div>
    </template>
  </XVirtualGrid>
</template>
```

### Infinite Loader

Utility for loading data on-demand as users scroll through lists.

**Using the composable (recommended):**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XVirtualList, useInfiniteLoader } from '@indielayer/ui'

const items = ref<string[]>([])
const hasMoreData = ref(true)

const isRowLoaded = (index: number) => index < items.value.length

const loadMoreRows = async (startIndex: number, stopIndex: number) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  for (let i = startIndex; i <= stopIndex; i++) {
    items.value[i] = `Item ${i}`
  }
  
  if (items.value.length >= 1000) {
    hasMoreData.value = false
  }
}

const { onRowsRendered } = useInfiniteLoader({
  isRowLoaded,
  loadMoreRows,
  rowCount: hasMoreData.value ? items.value.length + 50 : items.value.length,
  minimumBatchSize: 20,
  threshold: 15,
})
</script>

<template>
  <XVirtualList
    :row-count="hasMoreData ? items.length + 50 : items.length"
    :row-height="50"
    :style="{ height: '400px' }"
    :on-rows-rendered="onRowsRendered"
  >
    <template #row="{ index, style }">
      <div :style="style">
        {{ items[index] || 'Loading...' }}
      </div>
    </template>
  </XVirtualList>
</template>
```

**Using the component:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XVirtualList, XInfiniteLoader } from '@indielayer/ui'

const items = ref<string[]>([])

const isRowLoaded = (index: number) => index < items.value.length

const loadMoreRows = async (startIndex: number, stopIndex: number) => {
  for (let i = startIndex; i <= stopIndex; i++) {
    items.value[i] = `Item ${i}`
  }
}
</script>

<template>
  <XInfiniteLoader
    :is-row-loaded="isRowLoaded"
    :load-more-rows="loadMoreRows"
    :row-count="1000"
  >
    <template #default="{ onRowsRendered }">
      <XVirtualList
        :row-count="1000"
        :row-height="50"
        :style="{ height: '400px' }"
        :on-rows-rendered="onRowsRendered"
      >
        <template #row="{ index, style }">
          <div :style="style">
            {{ items[index] || 'Loading...' }}
          </div>
        </template>
      </XVirtualList>
    </template>
  </XInfiniteLoader>
</template>
```

## API

### XVirtualList Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `rowCount` | `number` | ✅ | Number of rows in the list |
| `rowHeight` | `number \| string \| function` | ✅ | Row height (px, %, or function) |
| `style` | `CSSProperties` | ❌ | Container styles (should include height) |
| `rowProps` | `object` | ❌ | Additional props passed to row slot |
| `overscanCount` | `number` | ❌ | Extra rows to render (default: 3) |
| `defaultHeight` | `number` | ❌ | Default height for SSR |
| `onRowsRendered` | `function` | ❌ | Callback when visible rows change |
| `onResize` | `function` | ❌ | Callback when container resizes |

### XVirtualGrid Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `rowCount` | `number` | ✅ | Number of rows |
| `columnCount` | `number` | ✅ | Number of columns |
| `rowHeight` | `number \| string \| function` | ✅ | Row height |
| `columnWidth` | `number \| string \| function` | ✅ | Column width |
| `style` | `CSSProperties` | ❌ | Container styles |
| `cellProps` | `object` | ❌ | Additional props passed to cell slot |
| `overscanCount` | `number` | ❌ | Extra rows/columns (default: 3) |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | ❌ | Text direction |
| `onCellsRendered` | `function` | ❌ | Callback when visible cells change |
| `onResize` | `function` | ❌ | Callback when container resizes |

### Infinite Loader Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isRowLoaded` | `(index: number) => boolean` | ✅ | - | Function to check if a row is loaded |
| `loadMoreRows` | `(start: number, stop: number) => Promise<void>` | ✅ | - | Async function to load more rows |
| `rowCount` | `number` | ✅ | - | Total row count (can be estimated) |
| `minimumBatchSize` | `number` | ❌ | 10 | Min rows to load per request |
| `threshold` | `number` | ❌ | 15 | Pre-fetch distance in rows |

## Credits

This library is a Vue 3 port of [react-window](https://github.com/bvaughn/react-window) by Brian Vaughn. All credit for the original design and virtualization algorithms goes to the original author and contributors.
