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
    default: 5,
  },
  keyProp: String,
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
import { ref, type ExtractPublicPropTypes, type PropType, watch, computed } from 'vue'
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

import { chevronDownIcon } from '../../common/icons'

const props = defineProps({
  ...tableProps,
  items: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
})

const selected = defineModel<number | string>('selected')
const hasSelected = computed(() => typeof selected.value !== 'undefined')

type internalT = T & {
  __expanded?: boolean;
}

function clone<T>(source: T[]): T[] {
  try {
    return JSON.parse(JSON.stringify(source))
  } catch (e) {
    return []
  }
}

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

const internalItems = ref<internalT[]>([])

watch(items, (newValue) => {
  if (props.expandable) internalItems.value = clone(newValue as any) as internalT[]
}, { immediate: true })

const emit = defineEmits(['update:sort', 'click-row'])

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

function getValue(item: any, path: string | string[] | undefined) {
  if (!path) return ''
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  const result = pathArray?.reduce((prevObj: any, key: string) => prevObj && prevObj[key], item)

  return result ?? ''
}

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
      :class="{
        '!h-auto': props.loading
      }"
    >
      <table
        :style="styles"
        :class="classes.table"
      >
        <x-table-head :sticky-header="stickyHeader">
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
              <td colspan="999">
                <slot name="error"></slot>
              </td>
            </tr>
          </template>
          <template v-else-if="!items || items.length === 0">
            <tr>
              <td colspan="999">
                <slot name="empty"></slot>
              </td>
            </tr>
          </template>
          <template v-for="(item, index) in list" v-else :key="keyProp ?? index">
            <x-table-row
              :pointer="pointer"
              :striped="striped"
              :selected="hasSelected ? selected === (keyProp ? (item.data as Record<string, unknown>)[keyProp] : item.index) : undefined"
              @click="$emit('click-row', item.data, item.index)"
            >
              <x-table-cell v-if="expandable" width="48" class="!p-1">
                <button
                  type="button"
                  class="px-3 p-2"
                  :class="[dense ? 'p-0.5' : 'px-3 py-2']"
                  @click="internalItems[item.index].__expanded = !internalItems[item.index].__expanded"
                >
                  <x-icon
                    :icon="chevronDownIcon"
                    :size="dense ? 'xs' : 'md'"
                    class="transition-transform"
                    :class="{
                      'rotate-180': internalItems[item.index]?.__expanded,
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
              >
                <slot :name="`item-${header.value}`" :item="item.data">
                  {{ getValue(item.data, header.value) }}
                </slot>
              </x-table-cell>
            </x-table-row>
            <tr v-if="expandable" :class="{ 'hidden': !internalItems[item.index]?.__expanded }">
              <td colspan="999">
                <div class="overflow-hidden transition-opacity" :class="[internalItems[item.index]?.__expanded ? '' : 'opacity-0 max-h-0']">
                  <slot name="expanded-row" :item="item.data"></slot>
                </div>
              </td>
            </tr>
          </template>
        </x-table-body>
        <div
          v-if="loading"
          :class="classes.loadingWrapper"
        >
          <x-spinner size="lg"/>
        </div>
      </table>
    </div>
  </div>
</template>
