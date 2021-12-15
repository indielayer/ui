<template>
  <ul class="flex items-end">
    <x-pagination-item
      :value="1"
      :links="links"
      :size="size"
      :selected="modelValue === 1"
      class="mr-1"
      @input="(value) => $emit('update:modelValue', value)"
    />
    <span v-if="totalPages > 3 && modelValue > 3">...</span>
    <x-pagination-item
      v-for="i in pages"
      :key="i"
      class="mx-1"
      :value="i"
      :links="links"
      :size="size"
      :selected="modelValue === i"
      @input="(value) => $emit('update:modelValue', value)"
    />
    <span v-if="totalPages > 3 && modelValue < totalPages - 2">...</span>
    <x-pagination-item
      v-if="totalPages > 1"
      :value="totalPages"
      :links="links"
      :size="size"
      class="ml-1"
      :selected="modelValue === totalPages"
      @input="(value) => $emit('update:modelValue', value)"
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
    modelValue: {
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
        if (this.modelValue === 1 || this.modelValue === 2) return [2, 3]
        if (this.modelValue === this.totalPages || this.modelValue === this.totalPages - 1) return [this.totalPages - 2, this.totalPages - 1]

        return [this.modelValue - 1, this.modelValue, this.modelValue + 1]
      }

      return []
    },
  },
}
</script>
