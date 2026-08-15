<script lang="ts">
const virtualGridProps = {
  cellProps: {
    type: Object as PropType<Record<string, unknown>>,
    description: 'Extra props passed to the cell slot as `props`.',
  },
  class: {
    type: String,
    description: 'CSS class name on the root element.',
  },
  columnCount: {
    type: Number,
    required: true,
    description: 'Total number of columns in the grid.',
  },
  columnWidth: {
    type: [Number, String, Function] as PropType<
    number | string | ((index: number, cellProps: Record<string, unknown>) => number)
    >,
    required: true,
    description: 'Column width as px, percent string, or a function of index.',
  },
  defaultHeight: {
    type: Number,
    default: 0,
    description: 'Initial grid height before measure; important for SSR.',
  },
  defaultWidth: {
    type: Number,
    default: 0,
    description: 'Initial grid width before measure; important for SSR.',
  },
  dir: {
    type: String as PropType<'ltr' | 'rtl' | 'auto'>,
    description: 'Text directionality for cell layout (ltr, rtl, or auto).',
  },
  onCellsRendered: {
    type: Function as PropType<(
      visibleCells: {
        columnStartIndex: number;
        columnStopIndex: number;
        rowStartIndex: number;
        rowStopIndex: number;
      },
      allCells: {
        columnStartIndex: number;
        columnStopIndex: number;
        rowStartIndex: number;
        rowStopIndex: number;
      }
    ) => void>,
    description: 'Called when the visible or overscan cell range changes.',
  },
  onResize: {
    type: Function as PropType<(
      size: { height: number; width: number; },
      prevSize: { height: number; width: number; }
    ) => void>,
    description: 'Called when the grid root resizes.',
  },
  overscanCount: {
    type: Number,
    default: 3,
    description: 'Extra rows/columns rendered outside the visible area.',
  },
  rowCount: {
    type: Number,
    required: true,
    description: 'Total number of rows in the grid.',
  },
  rowHeight: {
    type: [Number, String, Function] as PropType<
    number | string | ((index: number, cellProps: Record<string, unknown>) => number)
    >,
    required: true,
    description: 'Row height as px, percent string, or a function of index.',
  },
  style: {
    type: Object as PropType<CSSProperties>,
    description: 'Inline styles; the grid fills the size defined here.',
  },
  tag: {
    type: String as PropType<TagNames>,
    default: 'div',
    description: 'Root element tag.',
  },
}

export default {
  name: 'XVirtualGrid',
  docs: {
    slots: {
      cell: 'Render a single cell. Receives columnIndex, rowIndex, style, ariaAttributes, and props.',
      default: 'Optional content rendered after the virtualized cells.',
    },
    methods: {
      scrollToCell: 'Scroll so the given cell (row and column) is visible.',
      scrollToColumn: 'Scroll so the given column index is visible.',
      scrollToRow: 'Scroll so the given row index is visible.',
      element: 'Root HTML element when mounted, otherwise null.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type CSSProperties, type PropType } from 'vue'
import { useIsRtl } from '../../core/useIsRtl'
import { useVirtualizer } from '../../core/useVirtualizer'
import type { Align, TagNames } from '../../types'
import type { VirtualGridProps, VirtualGridImperativeAPI } from './types'

const props = defineProps(virtualGridProps) as unknown as VirtualGridProps

const element = ref<HTMLDivElement | null>(null)

const cellProps = computed(() => props.cellProps || ({} as Record<string, unknown>))

const isRtl = useIsRtl(element, props.dir)

const {
  getCellBounds: getColumnBounds,
  getEstimatedSize: getEstimatedWidth,
  startIndexOverscan: columnStartIndexOverscan,
  startIndexVisible: columnStartIndexVisible,
  scrollToIndex: scrollToColumnIndex,
  stopIndexOverscan: columnStopIndexOverscan,
  stopIndexVisible: columnStopIndexVisible,
} = useVirtualizer({
  containerElement: element,
  containerStyle: props.style,
  defaultContainerSize: props.defaultWidth,
  direction: 'horizontal',
  isRtl: isRtl.value,
  itemCount: props.columnCount,
  itemProps: cellProps.value,
  itemSize: props.columnWidth,
  onResize: props.onResize,
  overscanCount: props.overscanCount ?? 3,
})

const {
  getCellBounds: getRowBounds,
  getEstimatedSize: getEstimatedHeight,
  startIndexOverscan: rowStartIndexOverscan,
  startIndexVisible: rowStartIndexVisible,
  scrollToIndex: scrollToRowIndex,
  stopIndexOverscan: rowStopIndexOverscan,
  stopIndexVisible: rowStopIndexVisible,
} = useVirtualizer({
  containerElement: element,
  containerStyle: props.style,
  defaultContainerSize: props.defaultHeight,
  direction: 'vertical',
  itemCount: props.rowCount,
  itemProps: cellProps.value,
  itemSize: props.rowHeight,
  onResize: props.onResize,
  overscanCount: props.overscanCount ?? 3,
})

// Expose imperative API
defineExpose<VirtualGridImperativeAPI>({
  get element() {
    return element.value
  },

  scrollToCell({
    behavior = 'auto',
    columnAlign = 'auto',
    columnIndex,
    rowAlign = 'auto',
    rowIndex,
  }: {
    behavior?: ScrollBehavior;
    columnAlign?: Align;
    columnIndex: number;
    rowAlign?: Align;
    rowIndex: number;
  }) {
    const left = scrollToColumnIndex({
      align: columnAlign,
      containerScrollOffset: element.value?.scrollLeft ?? 0,
      index: columnIndex,
    })
    const top = scrollToRowIndex({
      align: rowAlign,
      containerScrollOffset: element.value?.scrollTop ?? 0,
      index: rowIndex,
    })

    if (typeof element.value?.scrollTo === 'function' && left !== undefined && top !== undefined) {
      element.value.scrollTo({
        behavior,
        left,
        top,
      })
    }
  },

  scrollToColumn({
    align = 'auto',
    behavior = 'auto',
    index,
  }: {
    align?: Align;
    behavior?: ScrollBehavior;
    index: number;
  }) {
    const left = scrollToColumnIndex({
      align,
      containerScrollOffset: element.value?.scrollLeft ?? 0,
      index,
    })

    if (typeof element.value?.scrollTo === 'function' && left !== undefined) {
      element.value.scrollTo({
        behavior,
        left,
      })
    }
  },

  scrollToRow({
    align = 'auto',
    behavior = 'auto',
    index,
  }: {
    align?: Align;
    behavior?: ScrollBehavior;
    index: number;
  }) {
    const top = scrollToRowIndex({
      align,
      containerScrollOffset: element.value?.scrollTop ?? 0,
      index,
    })

    if (typeof element.value?.scrollTo === 'function' && top !== undefined) {
      element.value.scrollTo({
        behavior,
        top,
      })
    }
  },
})

// Notify when visible cells change
watch(
  [
    columnStartIndexOverscan,
    columnStartIndexVisible,
    columnStopIndexOverscan,
    columnStopIndexVisible,
    rowStartIndexOverscan,
    rowStartIndexVisible,
    rowStopIndexOverscan,
    rowStopIndexVisible,
  ],
  ([
    colStartOverscan,
    colStartVisible,
    colStopOverscan,
    colStopVisible,
    rowStartOverscan,
    rowStartVisible,
    rowStopOverscan,
    rowStopVisible,
  ]) => {
    if (
      colStartOverscan >= 0 &&
      colStopOverscan >= 0 &&
      rowStartOverscan >= 0 &&
      rowStopOverscan >= 0 &&
      props.onCellsRendered
    ) {
      props.onCellsRendered(
        {
          columnStartIndex: colStartVisible,
          columnStopIndex: colStopVisible,
          rowStartIndex: rowStartVisible,
          rowStopIndex: rowStopVisible,
        },
        {
          columnStartIndex: colStartOverscan,
          columnStopIndex: colStopOverscan,
          rowStartIndex: rowStartOverscan,
          rowStopIndex: rowStopOverscan,
        },
      )
    }
  },
)

interface CellData {
  key: number;
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  ariaAttributes: {
    'aria-colindex': number;
    role: 'gridcell';
  };
}

interface RowData {
  key: number;
  rowIndex: number;
  columns: CellData[];
  ariaRowIndex: number;
}

// Generate cells
const rows = computed(() => {
  const result: RowData[] = []

  if (props.columnCount > 0 && props.rowCount > 0) {
    for (
      let rowIndex = rowStartIndexOverscan.value;
      rowIndex <= rowStopIndexOverscan.value;
      rowIndex++
    ) {
      const rowBounds = getRowBounds(rowIndex)

      const columns: CellData[] = []

      for (
        let columnIndex = columnStartIndexOverscan.value;
        columnIndex <= columnStopIndexOverscan.value;
        columnIndex++
      ) {
        const columnBounds = getColumnBounds(columnIndex)

        const cellStyle: CSSProperties = {
          position: 'absolute',
          left: isRtl.value ? undefined : 0,
          right: isRtl.value ? 0 : undefined,
          transform: `translate(${isRtl.value ? -columnBounds.scrollOffset : columnBounds.scrollOffset}px, ${rowBounds.scrollOffset}px)`,
          height: `${rowBounds.size}px`,
          width: `${columnBounds.size}px`,
        }

        columns.push({
          key: columnIndex,
          columnIndex,
          rowIndex,
          style: cellStyle,
          ariaAttributes: {
            'aria-colindex': columnIndex + 1,
            role: 'gridcell',
          },
        })
      }

      result.push({
        key: rowIndex,
        rowIndex,
        columns,
        ariaRowIndex: rowIndex + 1,
      })
    }
  }

  return result
})
</script>

<template>
  <component
    :is="tag"
    ref="element"
    :class="$props.class"
    :style="{
      position: 'relative',
      maxHeight: '100%',
      maxWidth: '100%',
      flexGrow: 1,
      overflow: 'auto',
      ...style
    }"
    :dir="dir"
    role="grid"
    :aria-colcount="columnCount"
    :aria-rowcount="rowCount"
  >
    <div
      v-for="row in rows"
      :key="row.key"
      role="row"
      :aria-rowindex="row.ariaRowIndex"
    >
      <template v-for="cell in row.columns" :key="cell.key">
        <slot
          name="cell"
          :column-index="cell.columnIndex"
          :row-index="cell.rowIndex"
          :style="cell.style"
          :aria-attributes="cell.ariaAttributes"
          :props="cellProps"
        ></slot>
      </template>
    </div>

    <slot ></slot>

    <!-- Sizing element -->
    <div
      aria-hidden
      :style="{
        height: `${getEstimatedHeight}px`,
        width: `${getEstimatedWidth}px`,
        zIndex: -1
      }"
    ></div>
  </component>
</template>
