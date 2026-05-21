import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick, type CSSProperties } from 'vue'
import VirtualList from './VirtualList.vue'
import { useDynamicRowHeight, DATA_ATTRIBUTE_LIST_INDEX } from './useDynamicRowHeight'
import { mockResizeObserver, setElementSize } from '../../test-utils/mockResizeObserver'
import type { DynamicRowHeight } from './types'

interface RowSlotProps {
  index: number;
  style: CSSProperties;
}

const listStyle = { height: '400px' } as const

function mountVirtualList(
  props: Record<string, unknown>,
  dynamicRowHeight?: DynamicRowHeight,
) {
  return mount(VirtualList, {
    props: {
      rowCount: 100,
      rowHeight: dynamicRowHeight ?? 50,
      style: listStyle,
      ...props,
    },
    slots: {
      row: ({ index, style }: RowSlotProps) =>
        h('div', { style, class: 'test-row' }, `Row ${index}`),
    },
  })
}

function createMockDynamicRowHeight(defaultRowHeight = 50) {
  const unobserve = vi.fn<[], void>()

  const dynamicRowHeight: DynamicRowHeight = {
    getAverageRowHeight: vi.fn(() => defaultRowHeight),
    getRowHeight: vi.fn(() => undefined),
    setRowHeight: vi.fn(),
    observeRowElements: vi.fn(() => unobserve),
    cleanup: vi.fn(),
  }

  return { dynamicRowHeight, unobserve }
}

describe('VirtualList', () => {
  it('renders correctly', () => {
    const wrapper = mountVirtualList({})

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.attributes('role')).toBe('list')
  })

  it('renders visible rows', () => {
    const wrapper = mountVirtualList({})

    const rows = wrapper.findAll('.test-row')

    expect(rows.length).toBeGreaterThan(0)
  })

  describe('dynamic row height watch', () => {
    it('does not observe row elements when rowHeight is fixed', async () => {
      const { dynamicRowHeight } = createMockDynamicRowHeight()

      mountVirtualList({ rowHeight: 50 })

      await flushPromises()
      await nextTick()

      expect(dynamicRowHeight.observeRowElements).not.toHaveBeenCalled()
    })

    it('observes visible row elements and sets data-virtual-index', async () => {
      const { dynamicRowHeight } = createMockDynamicRowHeight()

      const wrapper = mountVirtualList({ rowHeight: dynamicRowHeight })

      await flushPromises()
      await nextTick()

      expect(dynamicRowHeight.observeRowElements).toHaveBeenCalled()

      const observedElements = vi.mocked(dynamicRowHeight.observeRowElements).mock
        .calls[0]?.[0] as Element[]

      expect(observedElements.length).toBeGreaterThan(0)
      expect(
        observedElements.every((element) => !element.hasAttribute('aria-hidden')),
      ).toBe(true)

      const listElement = wrapper.element as HTMLElement
      const rowElements = Array.from(listElement.children).filter(
        (child) => !child.hasAttribute('aria-hidden'),
      )

      expect(rowElements.length).toBe(observedElements.length)
      rowElements.forEach((element) => {
        expect(element.hasAttribute(DATA_ATTRIBUTE_LIST_INDEX)).toBe(true)
      })
    })

    it('runs previous unobserve when the observed range changes', async () => {
      const { dynamicRowHeight, unobserve } = createMockDynamicRowHeight()

      const wrapper = mountVirtualList({ rowHeight: dynamicRowHeight })

      await flushPromises()
      await nextTick()

      expect(dynamicRowHeight.observeRowElements).toHaveBeenCalledTimes(1)
      expect(unobserve).not.toHaveBeenCalled()

      const listElement = wrapper.element as HTMLDivElement

      listElement.scrollTop = 2500
      listElement.dispatchEvent(new Event('scroll'))
      await flushPromises()
      await nextTick()

      expect(unobserve).toHaveBeenCalledTimes(1)
      expect(dynamicRowHeight.observeRowElements).toHaveBeenCalledTimes(2)
    })
  })

  describe('dynamic row height integration', () => {
    let unmockResizeObserver: (() => void) | undefined
    let dynamicRowHeight: DynamicRowHeight | undefined

    beforeEach(() => {
      unmockResizeObserver = mockResizeObserver()
      dynamicRowHeight = useDynamicRowHeight({ defaultRowHeight: 50 })
    })

    afterEach(() => {
      dynamicRowHeight?.cleanup()
      unmockResizeObserver?.()
    })

    it('updates measured heights when observed rows resize', async () => {
      const wrapper = mountVirtualList({ rowHeight: dynamicRowHeight })

      await flushPromises()
      await nextTick()

      const rowElement = wrapper.find('.test-row').element as HTMLElement

      setElementSize({
        element: rowElement,
        width: 100,
        height: 72,
      })

      await flushPromises()
      await nextTick()

      const index = Number(rowElement.getAttribute(DATA_ATTRIBUTE_LIST_INDEX))

      expect(dynamicRowHeight?.getRowHeight(index)).toBe(72)
    })
  })
})
