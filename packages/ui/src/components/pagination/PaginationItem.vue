<template>
  <li>
    <x-button
      :to="links ? `?page=${value}` : null"
      :size="size"
      class="mx-1 min-w-[32px]"
      :outlined="!selected"
      :color="selected ? 'primary' : 'none'"
      @click="!selected ? $emit('input', value) : null"
    >{{ value }}</x-button>
  </li>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    selected: {
      type: Boolean,
      default: false,
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
}
</script>
