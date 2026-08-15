<script lang="ts">
const virtualListProps = {
  class: {
    type: String,
    description: 'CSS class name on the root element.',
  },
  defaultHeight: {
    type: Number,
    default: 0,
    description: 'Initial list height before measure; important for SSR.',
  },
  onResize: {
    type: Function as PropType<(
      size: { height: number; width: number; },
      prevSize: { height: number; width: number; }
    ) => void>,
    description: 'Called when the list root resizes.',
  },
  onRowsRendered: {
    type: Function as PropType<(
      visibleRows: { startIndex: number; stopIndex: number; },
      allRows: { startIndex: number; stopIndex: number; }
    ) => void>,
    description: 'Called when the visible or overscan row range changes.',
  },
  overscanCount: {
    type: Number,
    default: 3,
    description: 'Extra rows rendered outside the visible area to reduce scroll flicker.',
  },
  rowCount: {
    type: Number,
    required: true,
    description: 'Total number of rows in the list.',
  },
  rowHeight: {
    type: [Number, String, Function, Object] as PropType<
    | number
    | string
    | ((index: number, cellProps: Record<string, unknown>) => number)
    | DynamicRowHeight
    >,
    required: true,
    description: 'Row height as px, percent string, function, or `useDynamicRowHeight` cache.',
  },
  rowProps: {
    type: Object as PropType<Record<string, unknown>>,
    description: 'Extra props passed to the row slot as `props`.',
  },
  style: {
    type: Object as PropType<CSSProperties>,
    description: 'Inline styles; the list fills the height defined here.',
  },
  tag: {
    type: String as PropType<TagNames>,
    default: 'div',
    description: 'Root element tag.',
  },
}

export default {
  name: 'XVirtualList',
  docs: {
    slots: {
      row: 'Render a single row. Receives index, style, ariaAttributes, and props.',
      default: 'Optional content rendered after the virtualized rows.',
    },
    methods: {
      scrollToRow: 'Scroll so the given row index is visible.',
      element: 'Root HTML element when mounted, otherwise null.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type CSSProperties, type PropType } from 'vue'
import { useVirtualizer } from '../../core/useVirtualizer'
import type { Align, TagNames } from '../../types'
import { isDynamicRowHeight as isDynamicRowHeightUtil } from './isDynamicRowHeight'
import type { VirtualListProps, VirtualListImperativeAPI, DynamicRowHeight } from './types'
import { DATA_ATTRIBUTE_LIST_INDEX } from './useDynamicRowHeight'

const props = defineProps(virtualListProps) as unknown as VirtualListProps

const element = ref<HTMLDivElement | null>(null)

const rowProps = computed(() => props.rowProps || ({} as Record<string, unknown>))

const itemCount = computed(() => props.rowCount)

const isDynamicRowHeight = computed(() => isDynamicRowHeightUtil(props.rowHeight))

const rowHeight = computed<number | string | ((index: number, cellProps: Record<string, unknown>) => number)>(() => {
  if (isDynamicRowHeight.value) {
    const dynamicHeight = props.rowHeight as DynamicRowHeight
    const avgHeight = dynamicHeight.getAverageRowHeight()

    return (index: number) => {
      return (
        dynamicHeight.getRowHeight(index) ??
        avgHeight
      )
    }
  }

  return props.rowHeight as number | string | ((index: number, cellProps: Record<string, unknown>) => number)
})

const {
  getCellBounds,
  getEstimatedSize,
  scrollToIndex,
  startIndexOverscan,
  startIndexVisible,
  stopIndexOverscan,
  stopIndexVisible,
} = useVirtualizer({
  containerElement: element,
  containerStyle: props.style,
  defaultContainerSize: props.defaultHeight,
  direction: 'vertical',
  itemCount,
  itemProps: rowProps,
  itemSize: rowHeight,
  onResize: props.onResize,
  overscanCount: props.overscanCount ?? 3,
})

// Expose imperative API
defineExpose<VirtualListImperativeAPI>({
  get element() {
    return element.value
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
    const top = scrollToIndex({
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

// Watch for dynamic row heights - run after DOM updates
watch(
  [element, startIndexOverscan, stopIndexOverscan, isDynamicRowHeight, () => props.rowHeight],
  ([el, start, stop, isDynamic], _old, onCleanup) => {
    if (!el || !isDynamic) {
      return
    }

    const rows = Array.from(el.children).filter((item, index) => {
      if (item.hasAttribute('aria-hidden')) {
        // Ignore sizing element
        return false
      }

      const attribute = `${start + index}`

      item.setAttribute(DATA_ATTRIBUTE_LIST_INDEX, attribute)

      return true
    })

    const dynamicHeight = props.rowHeight as DynamicRowHeight

    onCleanup(dynamicHeight.observeRowElements(rows))
  },
  { flush: 'post' }, // Run after DOM updates
)

// Notify when visible rows change
watch(
  [startIndexOverscan, startIndexVisible, stopIndexOverscan, stopIndexVisible],
  ([startOverscan, startVisible, stopOverscan, stopVisible]) => {
    if (startOverscan >= 0 && stopOverscan >= 0 && props.onRowsRendered) {
      props.onRowsRendered(
        {
          startIndex: startVisible,
          stopIndex: stopVisible,
        },
        {
          startIndex: startOverscan,
          stopIndex: stopOverscan,
        },
      )
    }
  },
)

interface RowData {
  key: number;
  index: number;
  style: CSSProperties;
  ariaAttributes: {
    'aria-posinset': number;
    'aria-setsize': number;
    role: 'listitem';
  };
}

// Generate rows
const rows = computed(() => {
  const result: RowData[] = []

  if (props.rowCount > 0) {
    for (
      let index = startIndexOverscan.value;
      index <= stopIndexOverscan.value;
      index++
    ) {
      const bounds = getCellBounds(index)

      const rowStyle: CSSProperties = {
        position: 'absolute',
        left: 0,
        transform: `translateY(${bounds.scrollOffset}px)`,
        // In case of dynamic row heights, don't specify a height style
        height: isDynamicRowHeight.value ? undefined : `${bounds.size}px`,
        width: '100%',
      }

      result.push({
        key: index,
        index,
        style: rowStyle,
        ariaAttributes: {
          'aria-posinset': index + 1,
          'aria-setsize': props.rowCount,
          role: 'listitem',
        },
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
      flexGrow: 1,
      overflowY: 'auto',
      ...style
    }"
    role="list"
  >
    <template v-for="row in rows" :key="row.key">
      <slot
        name="row"
        :index="row.index"
        :style="row.style"
        :aria-attributes="row.ariaAttributes"
        :props="rowProps"
      ></slot>
    </template>

    <slot ></slot>

    <!-- Sizing element -->
    <div
      aria-hidden
      :style="{
        height: `${getEstimatedSize}px`,
        width: '100%',
        zIndex: -1
      }"
    ></div>
  </component>
</template>
