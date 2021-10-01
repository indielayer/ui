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
        @click="header.sortable ? sortHeader(header) : null"
      >
        {{ header.text }}
      </table-header>
    </table-head>
    <table-body>
      <table-row v-for="(item, index) in items" :key="index" clickable @click="$emit('click-row', item)">
        <table-cell
          v-for="(header, index2) in headers"
          :key="index2"
          :text-align="header.align"
          :dense="dense"
          :fixed="fixed"
        >
          <slot :name="`item-${header.value}`" :item="item">
            {{ getPath(item, header.value) }}
          </slot>
        </table-cell>
      </table-row>
    </table-body>
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center z-40 bg-gray-300 rounded opacity-50"
    >
      <x-spinner size="lg"/>
    </div>
  </table>
</template>

<script>
import TableHead from './TableHead.vue'
import TableHeader from './TableHeader.vue'
import TableBody from './TableBody.vue'
import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'
import XSpinner from '../spinner/Spinner.vue'

export default {
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
    loading: {
      type: Boolean,
      default: false,
    },

    headers: {
      type: Array,
      default: () => [],
    },

    items: {
      type: Array,
      default: () => [],
    },

    sort: {
      type: Array,
      default: () => [],
    },

    dense: {
      type: Boolean,
      default: false,
    },

    fixed: {
      type: Boolean,
      default: false,
    },

    scrollable: {
      type: Boolean,
      default: true,
    },

    stickyHeader: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    getSort(headerValue, sort) {
      for (let i = 0; i < sort.length; i++) {
        const { 0: value, 1: order } = sort[i].split(',')

        if (headerValue === value) return parseInt(order)
      }

      return null
    },
    sortHeader(header) {
      // update sort array
      const sort = this.sort.slice(0)
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

      this.$emit('update:sort', sort)
    },
    getPath(obj, path, defValue) {
      if (!path) return undefined
      const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
      const result = pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj)

      return result === undefined ? defValue : result
    },
  },
}
</script>
