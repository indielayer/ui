<script lang="ts">
const infiniteLoaderProps = {
  isRowLoaded: {
    type: Function as PropType<(index: number) => boolean>,
    required: true,
    description: 'Returns whether the row at the given index is already loaded.',
  },
  loadMoreRows: {
    type: Function as PropType<(startIndex: number, stopIndex: number) => Promise<void>>,
    required: true,
    description: 'Loads more rows for the given index range; resolve when finished.',
  },
  minimumBatchSize: {
    type: Number,
    description: 'Minimum rows to request per load (default 10). Batches HTTP fetches.',
  },
  threshold: {
    type: Number,
    description: 'Prefetch when the user scrolls within this many rows of unloaded data (default 15).',
  },
  rowCount: {
    type: Number,
    required: true,
    description: 'Total row count; may be an upper bound if the true size is unknown.',
  },
}

export default {
  name: 'XInfiniteLoader',
  docs: {
    slots: {
      default: 'Render prop slot; receives `onRowsRendered` to wire into a virtual list.',
    },
  },
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useInfiniteLoader } from '../../composables/infinite-loader/useInfiniteLoader'
import type { InfiniteLoaderProps } from '../../composables/infinite-loader/types'

const props = defineProps(infiniteLoaderProps) as unknown as InfiniteLoaderProps

const { onRowsRendered } = useInfiniteLoader(props)
</script>

<template>
  <slot :on-rows-rendered="onRowsRendered" ></slot>
</template>
