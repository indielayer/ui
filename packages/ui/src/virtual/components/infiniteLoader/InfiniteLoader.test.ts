import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import InfiniteLoader from './InfiniteLoader.vue'
import type { InfiniteLoaderProps } from '../../composables/infinite-loader/types'

interface InfiniteLoaderSlotProps {
  onRowsRendered: (props: { startIndex: number; stopIndex: number; }) => void;
}

describe('InfiniteLoader', () => {
  test('should render slot with onRowsRendered callback', () => {
    const isRowLoaded = vi.fn(() => true)
    const loadMoreRows = vi.fn(() => Promise.resolve())

    const wrapper = mount(InfiniteLoader, {
      props: {
        isRowLoaded,
        loadMoreRows,
        rowCount: 10,
      } as InfiniteLoaderProps,
      slots: {
        default: (slotProps: InfiniteLoaderSlotProps) => {
          return h('div', { 'data-testid': 'slot-content' }, [
            `Callback type: ${typeof slotProps.onRowsRendered}`,
          ])
        },
      },
    })

    expect(wrapper.html()).toContain('Callback type: function')
  })

  test('should pass through onRowsRendered callback that triggers loadMoreRows', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())

    let capturedCallback: ((props: { startIndex: number; stopIndex: number; }) => void) | null = null

    mount(InfiniteLoader, {
      props: {
        isRowLoaded: (index) => index <= 2,
        loadMoreRows,
        rowCount: 10,
        threshold: 0, // Disable threshold for this test
        minimumBatchSize: 0, // Disable minimum batch size for this test
      } as InfiniteLoaderProps,
      slots: {
        default: (slotProps: InfiniteLoaderSlotProps) => {
          capturedCallback = slotProps.onRowsRendered

          return h('div')
        },
      },
    })

    expect(capturedCallback).toBeDefined()
    expect(typeof capturedCallback).toBe('function')

    // Call the callback if it is defined
    if (capturedCallback) {
      (capturedCallback as (props: { startIndex: number; stopIndex: number; }) => void)({ startIndex: 0, stopIndex: 5 })
    } else {
      throw new Error('capturedCallback is null')
    }

    // Should have triggered loadMoreRows for unloaded rows 3-5
    expect(loadMoreRows).toHaveBeenCalled()
    expect(loadMoreRows).toHaveBeenCalledWith(3, 5)
  })

  test('should work with VList integration pattern', () => {
    const loadMoreRows = vi.fn(() => Promise.resolve())
    const loadedRows = new Set([0, 1, 2])

    const wrapper = mount(InfiniteLoader, {
      props: {
        isRowLoaded: (index) => loadedRows.has(index),
        loadMoreRows,
        rowCount: 10,
        minimumBatchSize: 5,
      } as InfiniteLoaderProps,
      slots: {
        default: (slotProps: InfiniteLoaderSlotProps) => {
          // Simulate VList calling onRowsRendered
          slotProps.onRowsRendered({ startIndex: 0, stopIndex: 7 })

          return h('div', 'List content')
        },
      },
    })

    // Should load rows 3-7 with minimum batch size of 5
    expect(loadMoreRows).toHaveBeenCalled()
    expect(wrapper.html()).toContain('List content')
  })
})
