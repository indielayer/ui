<script lang="ts">
const tableProps = {
  headers: {
    type: Array as PropType<TableHeader[]>,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  sort: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  loading: Boolean,
  loadingSkeleton: Boolean,
  loadingLines: {
    type: [Number, String],
    default: 3,
  },
  error: Boolean,
  dense: Boolean,
  fixed: Boolean,
  striped: Boolean,
  pointer: Boolean,
  scrollable: {
    type: Boolean,
    default: true,
  },
  stickyHeader: {
    type: Boolean,
    default: true,
  },
  expandable: Boolean,
  virtualList: Boolean,
  virtualListOffsetTop: Number,
  virtualListOffsetBottom: Number,
  virtualListItemHeight: {
    type: Number,
    default: 54,
  },
  virtualListOverscan: {
    type: Number,
    default: 10,
  },
  keyProp: String,
  selectable: Boolean,
  singleSelect: Boolean,
  autoClearSelected: {
    type: Boolean,
    default: true,
  },
  toFn: Function as PropType<(item: unknown) => string | Record<string, unknown> | undefined>,
  hrefFn: Function as PropType<(item: unknown) => string>,
  hrefTarget: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
}

export type TableHeader = {
  sortable?: boolean;
  sort?: string[];
  align?: TableHeaderAlign;
  value?: string;
  text?: string;
  width?: string | number;
  truncate?: boolean;
  skeletonShape?: SkeletonShape;
  tooltip?: string;
}

export type TableProps = ExtractPublicPropTypes<typeof tableProps>

type InternalClasses = 'wrapper' | 'table' | 'loadingWrapper'
export interface TableTheme extends ThemeComponent<TableProps, InternalClasses> {}

export default { name: 'XTable' }
</script>

<script setup lang="ts" generic="T">
import { ref, type ExtractPublicPropTypes, type PropType, watch, computed, useSlots } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useVirtualList } from '../../composables/useVirtualList'

import XTableHead from './TableHead.vue'
import XTableHeader, { type TableHeaderSort, type TableHeaderAlign } from './TableHeader.vue'
import XTableBody from './TableBody'
import XTableRow from './TableRow.vue'
import XTableCell from './TableCell.vue'
import XSpinner from '../spinner/Spinner.vue'
import XSkeleton from '../skeleton/Skeleton.vue'
import type { SkeletonShape } from '../skeleton/Skeleton.vue'

import XIcon from '../icon/Icon.vue'
import XCheckbox from '../checkbox/Checkbox.vue'

import { chevronDownIcon } from '../../common/icons'

const props = defineProps({
  ...tableProps,
  items: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
  toFn: Function as PropType<(item: T) => string | Record<string, unknown> | undefined>,
  hrefFn: Function as PropType<(item: T) => string>,
  hrefTarget: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
})

const selected = defineModel<(number | string) | (number | string)[]>('selected')

// Use Map for expandable state to handle virtual list correctly
const expandedState = ref(new Map<number | string, boolean>())

const items = computed(() => props.items)

const { list, containerProps, wrapperProps } = useVirtualList(
  items,
  {
    disabled: !props.virtualList,
    itemHeight: props.virtualListItemHeight || 54,
    topOffset: props.virtualListOffsetTop || 0,
    bottomOffset: props.virtualListOffsetBottom || 0,
    overscan: props.virtualListOverscan,
  },
)

// Helper function to get item key with validation
function getItemKey(item: T, index: number): number | string {
  if (!props.keyProp || !item || typeof item !== 'object' || item === null) {
    return index
  }

  const keyValue = (item as Record<string, unknown>)[props.keyProp]

  // Validate that the key exists and is a valid type
  if (keyValue === undefined || keyValue === null) {
    console.warn(`[XTable] keyProp "${props.keyProp}" is undefined/null for item at index ${index}. Falling back to index.`)

    return index
  }

  if (typeof keyValue !== 'string' && typeof keyValue !== 'number') {
    console.warn(`[XTable] keyProp "${props.keyProp}" must be a string or number, got ${typeof keyValue}. Falling back to index.`)

    return index
  }

  return keyValue as number | string
}

// Helper function to get original index from virtual list item
// Note: useVirtualList always preserves the original index in item.index
function getOriginalIndex(virtualItem: { data: T; index: number; }): number {
  return virtualItem.index
}

const emit = defineEmits<{
  (e: 'update:sort', sortValues: string[]): void;
  (e: 'click-row', item: T, index: number): void;
}>()

function getSort(headerValue: string | undefined, sort: string[]): TableHeaderSort {
  if (!headerValue) return undefined

  for (let i = 0; i < sort.length; i++) {
    const { 0: value, 1: order } = sort[i].split(',')

    if (headerValue === value) {
      if (parseInt(order) > 0) return 1
      else return -1
    }
  }

  return undefined
}

function sortHeader(header: TableHeader) {
  // update sort array
  const sort = props.sort.slice(0)
  let exists = false

  for (let i = 0; i < sort.length; i++) {
    const { 0: value, 1: order } = sort[i].split(',')

    if (value === header.value) {
      exists = true

      if (order === '-1') {
        // update position to 1
        sort.splice(i, 1, `${header.value},1`)
        break
      } else if (order === '1') {
        // delete position
        sort.splice(i, 1)
        break
      }
    }
  }

  if (!exists) sort.push(`${header.value},-1`)

  emit('update:sort', sort)
}

const pathCache = new Map<string, string[]>()

function getValue(item: T, path: string | string[] | undefined): unknown {
  if (!path) return ''
  if (!item) return ''

  let pathArray: string[] | null

  if (Array.isArray(path)) {
    pathArray = path
  } else {
    // Check cache first
    if (pathCache.has(path)) {
      pathArray = pathCache.get(path)!
    } else {
      // Parse and cache the result
      pathArray = path.match(/([^[.\]])+/g)
      if (pathArray) {
        pathCache.set(path, pathArray)
      }
    }
  }

  if (!pathArray || pathArray.length === 0) return ''

  const result = pathArray.reduce((prevObj: unknown, key: string) => {
    if (prevObj === null || prevObj === undefined) return null
    if (typeof prevObj !== 'object') return null

    return (prevObj as Record<string, unknown>)[key]
  }, item)

  return result ?? ''
}

const allKeys = computed<(number | string)[]>(() => {
  if (!props.selectable) return []

  return items.value.map((item, index) => getItemKey(item, index))
})

const selectedSet = computed(() => {
  if (!props.selectable || props.singleSelect) return new Set<number | string>()
  if (!Array.isArray(selected.value)) return new Set<number | string>()

  return new Set(selected.value)
})

const allRowsSelected = computed(() => {
  if (!props.selectable || props.singleSelect) return false
  if (!Array.isArray(selected.value) || selected.value.length === 0) return false

  const keysLength = allKeys.value.length

  if (keysLength === 0) return false

  return selected.value.length === keysLength
})

const someRowsSelected = computed(() => {
  if (!props.selectable || props.singleSelect) return false
  if (!Array.isArray(selected.value) || selected.value.length === 0) return false

  const keysLength = allKeys.value.length

  if (keysLength === 0) return false

  return selected.value.length > 0 && selected.value.length !== keysLength
})

function isRowSelected(rowKey: number | string): boolean {
  if (!props.selectable) return false

  if (props.singleSelect) {
    return selected.value === rowKey
  }

  return selectedSet.value.has(rowKey)
}

function toggleRowSelection(rowKey: number | string) {
  if (!props.selectable) return

  if (props.singleSelect) {
    selected.value = selected.value === rowKey ? undefined : rowKey
  } else {
    if (!Array.isArray(selected.value)) selected.value = []

    // Use Set for O(1) lookup instead of includes O(n)
    if (selectedSet.value.has(rowKey)) {
      selected.value = selected.value.filter((k: number | string) => k !== rowKey)
    } else {
      selected.value = [...selected.value, rowKey]
    }
  }
}

function toggleSelectAll() {
  if (!props.selectable || props.singleSelect) return

  if (allRowsSelected.value || someRowsSelected.value) {
    selected.value = []
  } else {
    selected.value = allKeys.value
  }
}

function toggleExpanded(virtualItem: { data: T; index: number; }) {
  if (!props.expandable) return
  const itemKey = getItemKey(virtualItem.data, getOriginalIndex(virtualItem))

  expandedState.value.set(itemKey, !expandedState.value.get(itemKey))
}

function isExpanded(virtualItem: { data: T; index: number; }): boolean {
  if (!props.expandable) return false
  const itemKey = getItemKey(virtualItem.data, getOriginalIndex(virtualItem))

  return expandedState.value.get(itemKey) ?? false
}

function onTableRowClick(item: T, virtualItem: { data: T; index: number; }) {
  // Get the original index from the items array
  const originalIndex = getOriginalIndex(virtualItem)

  if (props.selectable && props.singleSelect) {
    const itemKey = getItemKey(item, originalIndex)

    toggleRowSelection(itemKey)
  }

  emit('click-row', item, originalIndex)
}

// Compute column count for colspan
const columnCount = computed(() => {
  let count = props.headers.length

  if (props.selectable && !props.singleSelect) count++
  if (props.expandable) count++

  return count
})

watch(items, (newValue: T[]) => {
  const currentKeys = new Set<number | string>()

  newValue.forEach((item, index) => {
    currentKeys.add(getItemKey(item, index))
  })

  // Clear expanded state for items that no longer exist
  if (props.expandable) {
    expandedState.value.forEach((_, key) => {
      if (!currentKeys.has(key)) {
        expandedState.value.delete(key)
      }
    })
  }

  // Clear selected items that no longer exist
  if (props.selectable && props.autoClearSelected) {
    if (props.singleSelect) {
      if (!currentKeys.has(selected.value as number | string)) {
        selected.value = undefined
      }
    } else {
      if (Array.isArray(selected.value) && selected.value.length > 0) {
        selected.value = selected.value.filter((k: number | string) => currentKeys.has(k))
      }
    }
  }
}, { immediate: true })

const slots = useSlots()

const hasFooter = computed(() => Object.keys(slots).some((key) => key.startsWith('footer-')))

const { styles, classes, className } = useTheme('Table', {}, props)
</script>

<template>
  <div
    :class="[className, classes.wrapper]"
    v-bind="containerProps"
  >
    <slot name="title"></slot>
    <slot name="actions"></slot>

    <div
      v-bind="wrapperProps"
      class="relative"
      :class="{
        '!h-auto': props.loading
      }"
    >
      <table
        :style="styles"
        :class="classes.table"
      >
        <x-table-head :sticky-header="stickyHeader">
          <x-table-header v-if="props.selectable && !props.singleSelect" width="40" class="!pl-3.5 !pr-0.5 !py-2.5 cursor-pointer" @click="toggleSelectAll">
            <x-checkbox
              :model-value="allRowsSelected || someRowsSelected"
              :indeterminate="someRowsSelected"
              hide-footer
              aria-label="Select all rows"
              skip-form-registry
              @click.prevent.stop="toggleSelectAll"
            />
          </x-table-header>
          <x-table-header v-if="expandable" width="48" class="!p-0"/>
          <x-table-header
            v-for="(header, index) in headers"
            :key="index"
            :text-align="header.align"
            :sort="getSort(header.value, sort)"
            :sortable="header.sortable"
            :width="header.width"
            :tooltip="header.tooltip"
            @click="header.sortable ? sortHeader(header) : null"
          >
            <slot :name="`header-${header.value}`" :header="header">
              {{ header.text }}
            </slot>
          </x-table-header>
        </x-table-head>
        <x-table-body>
          <template v-if="loading">
            <x-table-row
              v-for="(item, index) in Number(loadingLines)"
              :key="index"
              :striped="striped"
            >
              <x-table-cell
                v-for="(header, index2) in headers"
                :key="index2"
                :text-align="header.align"
                :width="header.width"
                :dense="dense"
                :fixed="fixed"
              >
                <slot :name="`loading-${header.value}`" :item="item">
                  <x-skeleton
                    class="max-w-[60%]"
                    :shape="header.skeletonShape || 'line'"
                    :class="{
                      'mx-auto': header.align === 'center',
                      'ml-auto': header.align === 'right',
                    }"
                  />
                </slot>
              </x-table-cell>
            </x-table-row>
          </template>
          <template v-else-if="error">
            <tr>
              <td :colspan="columnCount">
                <slot name="error"></slot>
              </td>
            </tr>
          </template>
          <template v-else-if="!items || items.length === 0">
            <tr>
              <td :colspan="columnCount">
                <slot name="empty"></slot>
              </td>
            </tr>
          </template>
          <template v-for="item in list" v-else :key="getItemKey(item.data, item.index)">
            <x-table-row
              :pointer="pointer || (!!toFn || !!hrefFn)"
              :striped="striped"
              :selected="isRowSelected(getItemKey(item.data, item.index))"
              :single-select="singleSelect"
              @click="onTableRowClick(item.data, item)"
            >
              <x-table-cell v-if="props.selectable && !singleSelect" width="40" class="!pl-3.5 !pr-0.5 cursor-pointer" @click.stop="toggleRowSelection(getItemKey(item.data, item.index))">
                <x-checkbox
                  :model-value="isRowSelected(getItemKey(item.data, item.index))"
                  hide-footer
                  :aria-label="`Select row ${getOriginalIndex(item) + 1}`"
                  skip-form-registry
                  @click.prevent.stop="toggleRowSelection(getItemKey(item.data, item.index))"
                />
              </x-table-cell>
              <x-table-cell v-if="expandable" width="48" class="!p-1">
                <button
                  type="button"
                  class="px-3 p-2"
                  :class="[dense ? 'p-0.5' : 'px-3 py-2']"
                  @click.stop="toggleExpanded(item)"
                >
                  <x-icon
                    :icon="chevronDownIcon"
                    :size="dense ? 'xs' : 'md'"
                    class="transition-transform"
                    :class="{
                      'rotate-180': isExpanded(item),
                    }"
                  />
                </button>
              </x-table-cell>
              <x-table-cell
                v-for="(header, index2) in headers"
                :key="index2"
                :text-align="header.align"
                :truncate="header.truncate"
                :width="header.width"
                :dense="dense"
                :style="[props.virtualList ? {
                  height: `${props.virtualListItemHeight}px`,
                  maxHeight: `${props.virtualListItemHeight}px`,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                } : {}]"
                :href="hrefFn ? hrefFn(item.data) : undefined"
                :to="toFn ? toFn(item.data) : undefined"
                :target="hrefFn ? hrefTarget : undefined"
              >
                <slot :name="`item-${header.value}`" :item="item.data">
                  {{ getValue(item.data, header.value) }}
                </slot>
              </x-table-cell>
            </x-table-row>
            <tr v-if="expandable" :class="{ 'hidden': !isExpanded(item) }">
              <td :colspan="columnCount">
                <div class="overflow-hidden transition-opacity" :class="[isExpanded(item) ? '' : 'opacity-0 max-h-0']">
                  <slot name="expanded-row" :item="item.data"></slot>
                </div>
              </td>
            </tr>
          </template>
        </x-table-body>
        <slot name="footer">
          <tfoot v-if="hasFooter && !loading">
            <x-table-row>
              <x-table-cell v-if="props.selectable && !props.singleSelect" width="40" class="!pl-3.5 !pr-0.5" />
              <x-table-cell v-if="expandable" width="48" class="!p-0" />
              <x-table-cell
                v-for="(header, index) in headers"
                :key="index"
                :text-align="header.align"
                :width="header.width"
                :dense="dense"
              >
                <slot :name="`footer-${header.value}`" :header="header"></slot>
              </x-table-cell>
            </x-table-row>
          </tfoot>
        </slot>
      </table>
      <div
        v-if="loading"
        :class="classes.loadingWrapper"
      >
        <x-spinner size="lg"/>
      </div>
    </div>
  </div>
</template>
