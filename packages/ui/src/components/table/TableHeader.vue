<script lang="ts">
const validators = {
  sort: [1,-1],
  textAlign: ['left','center','right','justify'],
}

export default { name: 'XTableHeader', validators }
</script>

<script setup lang="ts">
import type { PropType } from 'vue'

export type Sort = 1 | -1 | undefined
export type Align = 'left' | 'center' | 'right' | 'justify' | undefined

const props = defineProps({
  sort: {
    type: Number as PropType<Sort>,
    validator: (value: number) => validators.sort.includes(value),
  },
  sortable: Boolean,
  textAlign: {
    type: String as PropType<Align>,
    default: 'left',
    validator: (value: string) => validators.textAlign.includes(value),
  },
  stickyHeader: Boolean,
})
</script>

<template>
  <th
    class="py-2 font-semibold tracking-widest uppercase text-xs px-3"
    :class="[
      {
        // sort
        'cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-150 ease-in-out': sortable,
        // stickyHeader
        'sticky top-0': stickyHeader,
        // textAlign
        'text-left': textAlign === 'left',
        'text-right': textAlign === 'right',
        'text-center': textAlign === 'center',
        'text-justify': textAlign === 'justify',
      },
    ]"
  >
    <div
      v-if="sortable"
      class="relative inline-block"
    >
      <slot></slot>

      <svg
        v-if="sort && [1, -1].includes(sort)"
        class="absolute stroke-2 w-3 h-3 ml-0.5 -right-3 top-0.5"
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
          <line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
          />
          <polyline points="19 12 12 19 5 12" />
        </template>

        <template v-if="sort === 1">
          <line
            x1="12"
            y1="19"
            x2="12"
            y2="5"
          />
          <polyline points="5 12 12 5 19 12" />
        </template>
      </svg>
    </div>

    <template v-else>
      <slot></slot>
    </template>
  </th>
</template>
