<script lang="ts">
export default { name: 'XTable' }
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useTheme } from '../../composables/theme'

import XTableHead from './TableHead'
import XTableHeader, { type Sort, type Align } from './TableHeader.vue'
import XTableBody from './TableBody'
import XTableRow from './TableRow.vue'
import XTableCell from './TableCell.vue'
import XSpinner from '../spinner/Spinner.vue'

import theme from './Table.theme'

export type Header = {
  sortable?: boolean
  sort?: string[]
  align?: Align
  value?: string
  text?: string
  width?: string | number
}

const props = defineProps({
  headers: {
    type: Array as PropType<Array<Header>>,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  sort: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  },
  loading: Boolean,
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
})

const emit = defineEmits(['update:sort', 'click-row'])

function getSort(headerValue: string | undefined, sort: string[]): Sort {
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

function sortHeader(header: Header) {
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

const { styles, classes, className } = useTheme('table', theme, props)
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table
      :style="styles"
      :class="[
        className,
        classes.wrapper,
      ]"
    >
      <x-table-head>
        <x-table-header
          v-for="(header, index) in headers"
          :key="index"
          :sticky-header="stickyHeader"
          :text-align="header.align"
          :sort="getSort(header.value, sort)"
          :sortable="header.sortable"
          :width="header.width"
          @click="header.sortable ? sortHeader(header) : null"
        >
          {{ header.text }}
        </x-table-header>
      </x-table-head>
      <x-table-body>
        <x-table-row
          v-for="(item, index) in items"
          :key="index"
          :pointer="pointer"
          :striped="striped"
          @click="$emit('click-row', item)"
        >
          <x-table-cell
            v-for="(header, index2) in headers"
            :key="index2"
            :text-align="header.align"
            :dense="dense"
            :fixed="fixed"
          >
            <slot :name="`item-${header.value}`" :item="item">
              {{ getValue(item, header.value) }}
            </slot>
          </x-table-cell>
        </x-table-row>
      </x-table-body>
      <div
        v-if="loading"
        :class="classes.loadingWrapper"
      >
        <x-spinner size="lg"/>
      </div>
    </table>
  </div>
</template>
