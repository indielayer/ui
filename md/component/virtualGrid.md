# VirtualGrid
Renders only visible cells of a large grid for better scroll performance. Use VirtualGrid when a dense grid would be too heavy to mount all at once.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| cellProps | Object as PropType<Record<string |  | Extra props passed to the cell slot as `props`. |
| class | String |  | CSS class name on the root element. |
| columnCount | Number |  | Total number of columns in the grid. |
| columnWidth | [Number, String, Function] |  | Column width as px, percent string, or a function of index. |
| defaultHeight | Number | 0 | Initial grid height before measure; important for SSR. |
| defaultWidth | Number | 0 | Initial grid width before measure; important for SSR. |
| dir | String 'ltr'  \|  'rtl'  \|  'auto' |  | Text directionality for cell layout (ltr, rtl, or auto). |
| onCellsRendered | Function as PropType<(       visibleCells: {         columnStartIndex: number;         columnStopIndex: number;         rowStartIndex: number;         rowStopIndex: number; |  | Called when the visible or overscan cell range changes. |
| onResize | Function as PropType<(       size: { height: number; width: number; |  | Called when the grid root resizes. |
| overscanCount | Number | 3 | Extra rows/columns rendered outside the visible area. |
| rowCount | Number |  | Total number of rows in the grid. |
| rowHeight | [Number, String, Function] |  | Row height as px, percent string, or a function of index. |
| style | Object CSSProperties |  | Inline styles; the grid fills the size defined here. |
| tag | String TagNames | div | Root element tag. |

### Slots
- `cell`: Render a single cell. Receives columnIndex, rowIndex, style, ariaAttributes, and props.
- `default`: Optional content rendered after the virtualized cells.

### Events
- _(none)_

### Methods
- `element`: Root HTML element when mounted, otherwise null.
- `scrollToCell`: Scroll so the given cell (row and column) is visible.
- `scrollToColumn`: Scroll so the given column index is visible.
- `scrollToRow`: Scroll so the given row index is visible.

### Demos
#### Usage
```vue
<script setup lang="ts">
const gridRowCount = 1000
const gridColumnCount = 1000
</script>

<template>
  <x-virtual-grid
    :row-count="gridRowCount"
    :column-count="gridColumnCount"
    :row-height="48"
    :column-width="100"
    class="h-96 w-full rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950"
  >
    <template #cell="{ rowIndex, columnIndex, style }">
      <div
        :style="style"
        class="flex h-12 items-center justify-center border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-200"
      >
        R{{ rowIndex }}, C{{ columnIndex }}
      </div>
    </template>
  </x-virtual-grid>
</template>
```

HTML docs: https://indielayer.com/component/virtualGrid
