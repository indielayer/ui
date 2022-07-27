<script lang="ts">
const validators = {
  textAlign: [null,'left','center','right','justify'],
  verticalAlign: [null,'baseline','bottom','middle','text-bottom','text-top','top'],
}

export default {
  name: 'XTableCell',
  validators,
}
</script>

<script setup lang="ts">
import { useTheme } from '../../composables/theme'

import theme  from './TableCell.theme'

const props = defineProps({
  textAlign: {
    type: String,
    validator: (value: string) => validators.textAlign.includes(value),
  },
  truncate: Boolean,
  dense: Boolean,
  fixed: Boolean,
  verticalAlign: {
    type: String,
    default: 'middle',
    validator: (value: string) => validators.verticalAlign.includes(value),
  },
})

if (props.truncate && !props.fixed) {
  console.warn('Table must have "fixed" property set to true when using TableCell "truncate" property')
}

const { styles, classes, className } = useTheme('table-cell', theme, props)
</script>

<template>
  <td
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <slot></slot>
  </td>
</template>
