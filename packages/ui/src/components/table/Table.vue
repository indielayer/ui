<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import TableHead from './TableHead.vue'
import TableHeader, { type Sort, type Align } from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'
import XSpinner from '../spinner/Spinner.vue'

export type Header = {
  sortable?: boolean,
  sort?: string[],
  align?: Align,
  value: string,
  text: string,
  width: string | number
}

export default defineComponent({
  name: 'XTable',

  components: {
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    XSpinner,
  },

  props: {
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
  },

  emits: ['update:sort', 'click-row'],

  setup(props, { emit }) {
    function getSort(headerValue: string, sort: string[]): Sort {
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

    function getValue(item: any, path: string | string[]) {
      if (!path) return ''
      const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
      const result = pathArray?.reduce((prevObj: any, key: string) => prevObj && prevObj[key], item)

      return result ?? ''
    }

    return {
      getSort,
      getValue,
      sortHeader,
    }
  },
})
</script>

<template>
  <table
    class="w-full relative"
    :class="[
      {
        'overflow-x-scroll sm:overflow-x-auto whitespace-wrap sm:whitespace-normal block sm:table': scrollable,
        'relative': stickyHeader,
        'table-fixed': fixed,
      }
    ]"
  >
    <table-head>
      <table-header
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
      </table-header>
    </table-head>
    <table-body>
      <table-row
        v-for="(item, index) in items"
        :key="index"
        :pointer="pointer"
        :striped="striped"
        @click="$emit('click-row', item)"
      >
        <table-cell
          v-for="(header, index2) in headers"
          :key="index2"
          :text-align="header.align"
          :dense="dense"
          :fixed="fixed"
        >
          <slot :name="`item-${header.value}`" :item="item">
            {{ getValue(item, header.value) }}
          </slot>
        </table-cell>
      </table-row>
    </table-body>
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center z-40 bg-gray-300 dark:bg-gray-600 rounded opacity-50"
    >
      <x-spinner size="lg"/>
    </div>
  </table>
</template>
