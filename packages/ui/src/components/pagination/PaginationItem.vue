<script lang="ts">
import { useCommon } from '../../composables/common'

export default {
  name: 'XPaginationItem',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { useTheme } from '../../composables/theme'

import XButton from '../button/Button.vue'

import theme from './PaginationItem.theme'

const props = defineProps({
  ...useCommon.props(),
  value: {
    type: Number,
    default: 0,
  },
  selected: Boolean,
  links: Boolean,
})

const emit = defineEmits(['input'])

const { styles, classes, className } = useTheme('pagination-item', theme, props)
</script>

<template>
  <li>
    <x-button
      :to="links ? `?page=${value}` : undefined"
      :size="size"
      :style="styles"
      :class="[
        className,
        classes.wrapper
      ]"
      :outlined="!selected"
      :color="selected ? 'primary' : undefined"
      @click="!selected ? $emit('input', value) : null"
    >
      {{ value }}
    </x-button>
  </li>
</template>
