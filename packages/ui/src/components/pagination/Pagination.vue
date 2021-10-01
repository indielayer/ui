<template>
  <ul class="flex items-end">
    <x-pagination-item
      :value="1"
      :links="links"
      :size="size"
      :selected="value === 1"
      class="mr-1"
      @input="(value) => $emit('input', value)"
    />
    <span v-if="totalPages > 3 && value > 3">...</span>
    <x-pagination-item
      v-for="i in pages"
      :key="i"
      class="mx-1"
      :value="i"
      :links="links"
      :size="size"
      :selected="value === i"
      @input="(value) => $emit('input', value)"
    />
    <span v-if="totalPages > 3 && value < totalPages - 2">...</span>
    <x-pagination-item
      v-if="totalPages > 1"
      :value="totalPages"
      :links="links"
      :size="size"
      class="ml-1"
      :selected="value === totalPages"
      @input="(value) => $emit('input', value)"
    />
  </ul>
</template>

<script>
import XPaginationItem from './PaginationItem.vue'

export default {
  components: {
    XPaginationItem,
  },
  props: {
    totalPages: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
      default: null,
    },
    links: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    pages() {
      if (this.totalPages === 3) return [2]
      if (this.totalPages > 2) {
        if (this.value === 1 || this.value === 2) return [2, 3]
        if (this.value === this.totalPages || this.value === this.totalPages - 1) return [this.totalPages - 2, this.totalPages - 1]

        return [this.value - 1, this.value, this.value + 1]
      }

      return []
    },
  },
}
</script>
