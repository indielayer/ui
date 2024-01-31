<script lang="ts">
const validators = {
  textAlign: [null, 'left', 'center', 'right', 'justify'] as const,
  verticalAlign: [null, 'baseline', 'bottom', 'middle', 'text-bottom', 'text-top', 'top'] as const,
}
const tableCellProps = {
  textAlign: {
    type: String as PropType<TableCellTextAlign>,
    validator: (value: string) => validators.textAlign.includes(value as any),
  },
  truncate: Boolean,
  dense: Boolean,
  width: [String, Number],
  verticalAlign: {
    type: String as PropType<TableCellVerticalAlign>,
    default: 'middle',
    validator: (value: string) => validators.verticalAlign.includes(value as any),
  },
}

export type TableCellTextAlign = typeof validators.textAlign[number]
export type TableCellVerticalAlign = typeof validators.verticalAlign[number]
export type TableCellProps = ExtractPublicPropTypes<typeof tableCellProps>

type InternalClasses = 'wrapper'
export interface TableCellTheme extends ThemeComponent<TableCellProps, InternalClasses> {}

export default {
  name: 'XTableCell',
  validators,
}
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(tableCellProps)

const computedWidth = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)

const { styles, classes, className } = useTheme('TableCell', {}, props)
</script>

<template>
  <td
    :style="[styles, { width: computedWidth, minWidth: computedWidth, maxWidth: computedWidth }]"
    :class="[
      'relative',
      className,
      classes.wrapper,
    ]"
  >
    <slot></slot>
  </td>
</template>
