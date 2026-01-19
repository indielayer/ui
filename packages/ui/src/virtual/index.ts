export { default as XVirtualGrid } from './components/virtualGrid/VirtualGrid.vue'
export type {
  CellSlotProps,
  VirtualGridImperativeAPI,
  VirtualGridProps,
} from './components/virtualGrid/types'

export { default as XVirtualList } from './components/virtualList/VirtualList.vue'
export { useDynamicRowHeight } from './components/virtualList/useDynamicRowHeight'
export type {
  DynamicRowHeight,
  VirtualListImperativeAPI,
  VirtualListProps,
  RowSlotProps,
} from './components/virtualList/types'

export { default as XInfiniteLoader } from './components/infiniteLoader/InfiniteLoader.vue'
export { useInfiniteLoader } from './composables/infinite-loader/useInfiniteLoader'
export type {
  Indices,
  OnRowsRendered,
  InfiniteLoaderProps,
} from './composables/infinite-loader/types'

export { getScrollbarSize } from './utils/getScrollbarSize'
