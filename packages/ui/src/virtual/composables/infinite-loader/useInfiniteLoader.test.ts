import { describe, expect, test, vi } from 'vitest'
import { ref } from 'vue'
import { useInfiniteLoader } from './useInfiniteLoader'
import type { InfiniteLoaderProps } from './types'

describe('useInfiniteLoader', () => {
  test('should not load rows that have already been loaded', () => {
    const isRowLoaded = vi.fn(() => true)
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const props: InfiniteLoaderProps = {
      isRowLoaded,
      loadMoreRows,
      rowCount: 10,
    }

    const { onRowsRendered } = useInfiniteLoader(props)

    expect(isRowLoaded).not.toHaveBeenCalled()

    onRowsRendered({
      startIndex: 0,
      stopIndex: 9,
    })

    expect(isRowLoaded).toHaveBeenCalled()
    expect(loadMoreRows).not.toHaveBeenCalled()
  })

  test('should call loadMoreRows when needed', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const props: InfiniteLoaderProps = {
      isRowLoaded: (index) => index <= 2,
      loadMoreRows,
      rowCount: 5,
    }

    const { onRowsRendered } = useInfiniteLoader(props)

    expect(loadMoreRows).not.toHaveBeenCalled()

    onRowsRendered({
      startIndex: 0,
      stopIndex: 4,
    })

    expect(loadMoreRows).toHaveBeenCalled()
    expect(loadMoreRows).toHaveBeenLastCalledWith(3, 4)
  })

  test('should work with reactive props', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())
    const rowCount = ref(5)

    const props = ref<InfiniteLoaderProps>({
      isRowLoaded: (index) => index <= 2,
      loadMoreRows,
      rowCount: rowCount.value,
    })

    const { onRowsRendered } = useInfiniteLoader(props)

    onRowsRendered({
      startIndex: 0,
      stopIndex: 4,
    })

    expect(loadMoreRows).toHaveBeenCalledWith(3, 4)

    // Update rowCount
    rowCount.value = 10
    props.value = {
      ...props.value,
      rowCount: rowCount.value,
    }

    onRowsRendered({
      startIndex: 0,
      stopIndex: 9,
    })

    // Should now load indices 3-9 (excluding already pending 3-4)
    expect(loadMoreRows).toHaveBeenLastCalledWith(5, 9)
  })

  test('should respect minimumBatchSize', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const props: InfiniteLoaderProps = {
      isRowLoaded: (index) => index < 4,
      loadMoreRows,
      rowCount: 10,
      minimumBatchSize: 4,
      threshold: 0, // Disable threshold for this test
    }

    const { onRowsRendered } = useInfiniteLoader(props)

    onRowsRendered({
      startIndex: 0,
      stopIndex: 4,
    })

    // Should load at least minimumBatchSize (4) rows
    expect(loadMoreRows).toHaveBeenCalledWith(4, 7)
  })

  test('should respect threshold for pre-fetching', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const props: InfiniteLoaderProps = {
      isRowLoaded: (index) => index < 5,
      loadMoreRows,
      rowCount: 100,
      threshold: 10,
    }

    const { onRowsRendered } = useInfiniteLoader(props)

    // User is viewing rows 10-20
    onRowsRendered({
      startIndex: 10,
      stopIndex: 20,
    })

    // With threshold 10, should check indices 0-30
    // Rows 5-30 should be loaded
    expect(loadMoreRows).toHaveBeenCalledWith(5, 30)
  })

  test('should track pending rows', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const props: InfiniteLoaderProps = {
      isRowLoaded: (index) => index <= 2,
      loadMoreRows,
      rowCount: 10,
    }

    const { onRowsRendered, pendingRowsCache } = useInfiniteLoader(props)

    expect(pendingRowsCache.size).toBe(0)

    onRowsRendered({
      startIndex: 0,
      stopIndex: 5,
    })

    // Rows 3, 4, 5 should be marked as pending
    expect(pendingRowsCache.has(3)).toBe(true)
    expect(pendingRowsCache.has(4)).toBe(true)
    expect(pendingRowsCache.has(5)).toBe(true)
    expect(pendingRowsCache.has(2)).toBe(false)
  })

  test('should not load rows that are already pending', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const props: InfiniteLoaderProps = {
      isRowLoaded: (index) => index <= 2,
      loadMoreRows,
      rowCount: 10,
      threshold: 0, // Disable threshold for this test
      minimumBatchSize: 0, // Disable minimum batch size for this test
    }

    const { onRowsRendered } = useInfiniteLoader(props)

    // First call loads rows 3-5
    onRowsRendered({
      startIndex: 0,
      stopIndex: 5,
    })

    expect(loadMoreRows).toHaveBeenCalledTimes(1)
    expect(loadMoreRows).toHaveBeenLastCalledWith(3, 5)

    // Second call with same range shouldn't load again
    onRowsRendered({
      startIndex: 0,
      stopIndex: 5,
    })

    // Should still be called only once
    expect(loadMoreRows).toHaveBeenCalledTimes(1)
  })

  test('should clean up pending cache when rows are loaded', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())
    const loadedRows = new Set<number>([0, 1, 2])

    const props: InfiniteLoaderProps = {
      isRowLoaded: (index) => loadedRows.has(index),
      loadMoreRows,
      rowCount: 10,
      threshold: 0,
      minimumBatchSize: 0,
    }

    const { onRowsRendered, pendingRowsCache } = useInfiniteLoader(props)

    // First call loads rows 3-5
    onRowsRendered({
      startIndex: 0,
      stopIndex: 5,
    })

    expect(pendingRowsCache.size).toBe(3) // Rows 3, 4, 5 are pending
    expect(pendingRowsCache.has(3)).toBe(true)
    expect(pendingRowsCache.has(4)).toBe(true)
    expect(pendingRowsCache.has(5)).toBe(true)

    // Simulate rows 3 and 4 being loaded
    loadedRows.add(3)
    loadedRows.add(4)

    // Next call should clean up loaded rows from pending cache
    onRowsRendered({
      startIndex: 3,
      stopIndex: 7,
    })

    // Rows 3 and 4 should be removed from pending cache
    expect(pendingRowsCache.has(3)).toBe(false)
    expect(pendingRowsCache.has(4)).toBe(false)
    // Row 5 should still be pending
    expect(pendingRowsCache.has(5)).toBe(true)
    // Rows 6 and 7 should now be pending
    expect(pendingRowsCache.has(6)).toBe(true)
    expect(pendingRowsCache.has(7)).toBe(true)

    // Total should be 3 (rows 5, 6, 7)
    expect(pendingRowsCache.size).toBe(3)
  })
})
