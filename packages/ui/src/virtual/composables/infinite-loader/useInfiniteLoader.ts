import { computed, reactive, toValue, type MaybeRefOrGetter } from 'vue'
import { scanForUnloadedIndices } from './scanForUnloadedIndices'
import type { Indices, OnRowsRendered, InfiniteLoaderProps } from './types'

export function useInfiniteLoader(
  props: MaybeRefOrGetter<InfiniteLoaderProps>,
) {
  // Create a reactive Set to track pending rows
  const pendingRowsCache = reactive(new Set<number>())

  // Computed values that react to props changes
  const isRowLoaded = computed(
    () => toValue(props).isRowLoaded,
  )
  const loadMoreRows = computed(
    () => toValue(props).loadMoreRows,
  )
  const minimumBatchSize = computed(
    () => toValue(props).minimumBatchSize ?? 10,
  )
  const rowCount = computed(
    () => toValue(props).rowCount,
  )
  const threshold = computed(
    () => toValue(props).threshold ?? 15,
  )

  // Check if a row is loaded or pending
  const isRowLoadedOrPending = (index: number): boolean => {
    if (isRowLoaded.value(index)) {
      // Clean up: remove from pending cache if it's now loaded
      if (pendingRowsCache.has(index)) {
        pendingRowsCache.delete(index)
      }

      return true
    }

    return pendingRowsCache.has(index)
  }

  // Main callback to be passed to VList's onRowsRendered
  const onRowsRendered: OnRowsRendered = ({ startIndex, stopIndex }: Indices) => {
    // Clean up: remove loaded rows from pending cache
    // This prevents unbounded memory growth in long-running apps
    if (pendingRowsCache.size > 0) {
      const loadedIndices: number[] = []

      pendingRowsCache.forEach((index) => {
        if (isRowLoaded.value(index)) {
          loadedIndices.push(index)
        }
      })

      loadedIndices.forEach((index) => pendingRowsCache.delete(index))
    }

    const unloadedIndices = scanForUnloadedIndices({
      isRowLoaded: isRowLoadedOrPending,
      minimumBatchSize: minimumBatchSize.value,
      rowCount: rowCount.value,
      startIndex: Math.max(0, startIndex - threshold.value),
      stopIndex: Math.min(rowCount.value - 1, stopIndex + threshold.value),
    })

    for (let index = 0; index < unloadedIndices.length; index++) {
      const { startIndex: unloadedStartIndex, stopIndex: unloadedStopIndex } =
        unloadedIndices[index]

      // Mark all indices in this range as pending
      for (
        let idx = unloadedStartIndex;
        idx <= unloadedStopIndex;
        idx++
      ) {
        pendingRowsCache.add(idx)
      }

      // Fire the load request (fire-and-forget pattern)
      loadMoreRows.value(unloadedStartIndex, unloadedStopIndex)
    }
  }

  return {
    onRowsRendered,
    pendingRowsCache,
  }
}
