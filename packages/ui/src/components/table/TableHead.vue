<script lang="ts">
const tableHeadProps = {}

export type TableHeadProps = ExtractPublicPropTypes<typeof tableHeadProps>

type InternalClasses = 'thead' | 'row'
export interface TableHeadTheme extends ThemeComponent<TableHeadProps, InternalClasses> {}

export default { name: 'XTableHead' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const { styles, classes, className } = useTheme('TableHead', {}, {})
</script>

<template>
  <thead :class="[className, classes.thead]" :style="styles">
    <tr :class="classes.row">
      <slot></slot>
    </tr>
  </thead>
</template>
