<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const tableHeadProps = {
  stickyHeader: optionalBooleanProp('Keeps the header row sticky while the table scrolls.'),
}

export type TableHeadProps = ExtractPublicPropTypes<typeof tableHeadProps>

type InternalClasses = 'thead' | 'row'
export interface TableHeadTheme extends ThemeComponent<TableHeadProps, InternalClasses> {}

export default {
  name: 'XTableHead',
  docs: {
    slots: {
      default: 'Header cells (`x-table-header` children).',
    },
  },
}
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(tableHeadProps)

const { styles, classes, className } = useTheme('TableHead', {}, props)
</script>

<template>
  <thead :class="[className, classes.thead]" :style="styles">
    <tr :class="classes.row">
      <slot></slot>
    </tr>
  </thead>
</template>
