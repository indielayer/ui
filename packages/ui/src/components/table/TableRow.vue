<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const validators = {
  verticalAlign: ['baseline', 'bottom', 'middle', 'text-bottom', 'text-top', 'top'],
}

const tableRowProps = {
  pointer: optionalBooleanProp('Pointer cursor on the row.'),
  striped: optionalBooleanProp('Applies striped row styling.'),
  selected: {
    type: Boolean,
    description: 'Marks the row as selected.',
  },
  singleSelect: optionalBooleanProp('Single-select styling for the selected row.'),
  verticalAlign: {
    type: String as PropType<'baseline' | 'bottom' | 'middle' | 'text-bottom' | 'text-top' | 'top'>,
    default: 'top',
    validator: (value: string) => validators.verticalAlign.includes(value),
    description: 'Vertical alignment for cells in the row.',
  },
}

export type TableRowProps = ExtractPublicPropTypes<typeof tableRowProps>

type InternalClasses = 'row'
export interface TableRowTheme extends ThemeComponent<TableRowProps, InternalClasses> {}

export default {
  name: 'XTableRow',
  validators,
  docs: {
    slots: {
      default: 'Row cells (`x-table-cell` children).',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, type PropType, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(tableRowProps)

const alignClass = computed(() => {
  if (props.verticalAlign === 'baseline') return 'align-baseline'
  else if (props.verticalAlign === 'bottom') return 'align-bottom'
  else if (props.verticalAlign === 'middle') return 'align-middle'
  else if (props.verticalAlign === 'text-bottom') return 'align-text-bottom'
  else if (props.verticalAlign === 'text-top') return 'align-text-top'
  else if (props.verticalAlign === 'top') return 'align-top'

  return ''
})

const { styles, classes, className } = useTheme('TableRow', {}, props)
</script>

<template>
  <tr :style="styles" :class="[className, classes.row, alignClass]">
    <slot></slot>
  </tr>
</template>
