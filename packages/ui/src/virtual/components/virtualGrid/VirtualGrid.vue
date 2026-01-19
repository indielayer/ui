<script lang="ts">
export default {
  name: 'XVirtualGrid',
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type CSSProperties } from 'vue'
import { useIsRtl } from '../../core/useIsRtl'
import { useVirtualizer } from '../../core/useVirtualizer'
import type { Align } from '../../types'
import type { VirtualGridProps, VirtualGridImperativeAPI } from './types'

const props = withDefaults(defineProps<VirtualGridProps>(), {
  defaultHeight: 0,
  defaultWidth: 0,
  overscanCount: 3,
  tag: 'div',
})

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
  overscanCount: props.overscanCount,
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
  overscanCount: props.overscanCount,
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
