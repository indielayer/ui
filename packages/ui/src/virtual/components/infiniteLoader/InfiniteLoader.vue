<script lang="ts">
export default {
  name: 'XInfiniteLoader',
}
</script>

<script setup lang="ts">
import { useInfiniteLoader } from '../../composables/infinite-loader/useInfiniteLoader'
import type { InfiniteLoaderProps } from '../../composables/infinite-loader/types'

const props = defineProps<InfiniteLoaderProps>()

const { onRowsRendered } = useInfiniteLoader(props)
</script>

<template>
  <slot :on-rows-rendered="onRowsRendered" ></slot>
</template>
