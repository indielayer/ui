<script lang="ts">
const validators = {
  sort: [1, -1, undefined] as const,
  textAlign: ['left', 'center', 'right', 'justify'] as const,
}

const tableHeaderProps = {
  sort: {
    type: Number as PropType<TableHeaderSort>,
    validator: (value: number) => validators.sort.includes(value as any),
  },
  sortable: Boolean,
  textAlign: {
    type: String as PropType<TableHeaderAlign>,
    default: 'left',
    validator: (value: string) => validators.textAlign.includes(value as any),
  },
  tooltip: String,
}

export type TableHeaderSort = typeof validators.sort[number]
export type TableHeaderAlign = typeof validators.textAlign[number]
export type TableHeaderProps = ExtractPublicPropTypes<typeof tableHeaderProps>

type InternalClasses = 'th' | 'sortIcon' | 'header'
export interface TableHeaderTheme extends ThemeComponent<TableHeaderProps, InternalClasses> {}

export default { name: 'XTableHeader', validators }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import XToggleTip from '../tooltip/ToggleTip.vue'

const props = defineProps(tableHeaderProps)

const { styles, classes, className } = useTheme('TableHeader', {}, props)
</script>

<template>
  <th :style="styles" :class="[className, classes.th, 'group/th']">
    <div :class="classes.header">
      <slot></slot>

      <x-toggle-tip v-if="tooltip" :content="tooltip"/>

      <svg
        v-if="sortable"
        class="shrink-0"
        :class="[
          classes.sortIcon,
          [sort && [1, -1].includes(sort) ? '' : 'invisible group-hover/th:visible'],
          [sort !== -1 && sort !== 1 ? 'text-secondary-400 dark:text-secondary-500' : 'text-primary-700 dark:text-primary-400']
        ]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        role="presentation"
      >
        <template v-if="sort === -1">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <polyline points="19 12 12 19 5 12" />
        </template>

        <template v-else-if="sort === 1">
          <line x1="12" y1="19" x2="12" y2="5"/>
          <polyline points="5 12 12 5 19 12" />
        </template>

        <template v-else>
          <path d="m3 9l4-4l4 4M7 5v14m14-4l-4 4l-4-4m4 4V5"/>
        </template>
      </svg>
    </div>
  </th>
</template>
