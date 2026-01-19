import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDynamicRowHeight, DATA_ATTRIBUTE_LIST_INDEX } from './useDynamicRowHeight'
import { mockResizeObserver, setElementSize } from '../../test-utils/mockResizeObserver'

describe('useDynamicRowHeight', () => {
  let unmock: (() => void) | undefined

  beforeEach(() => {
    unmock = mockResizeObserver()
  })

  afterEach(() => {
    if (unmock) {
      unmock()
    }
  })

  describe('getAverageRowHeight', () => {
    test('returns an initial estimate based on the defaultRowHeight', () => {
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
      })

      expect(dynamicRowHeight.getAverageRowHeight()).toBe(100)
    })

    test('returns an estimate based on measured rows', () => {
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
      })

      dynamicRowHeight.setRowHeight(0, 10)
      dynamicRowHeight.setRowHeight(1, 20)
      expect(dynamicRowHeight.getAverageRowHeight()).toBe(15)

      dynamicRowHeight.setRowHeight(2, 30)
      expect(dynamicRowHeight.getAverageRowHeight()).toBe(20)

      dynamicRowHeight.setRowHeight(2, 15)
      expect(dynamicRowHeight.getAverageRowHeight()).toBe(15)
    })

    test('resets when key changes', async () => {
      const key = ref('a')
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
        key,
      })

      dynamicRowHeight.setRowHeight(0, 10)
      expect(dynamicRowHeight.getAverageRowHeight()).toBe(10)

      // Key hasn't changed
      await nextTick()
      expect(dynamicRowHeight.getAverageRowHeight()).toBe(10)

      // Change key
      key.value = 'b'
      await nextTick()
      expect(dynamicRowHeight.getAverageRowHeight()).toBe(100)
    })
  })

  describe('getRowHeight', () => {
    test('returns estimated height for a row that has not yet been measured', () => {
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
      })

      expect(dynamicRowHeight.getRowHeight(0)).toBe(100)
    })

    test('returns the most recently measured size', () => {
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
      })

      dynamicRowHeight.setRowHeight(0, 15)
      dynamicRowHeight.setRowHeight(1, 20)
      dynamicRowHeight.setRowHeight(3, 25)
      expect(dynamicRowHeight.getRowHeight(0)).toBe(15)
      expect(dynamicRowHeight.getRowHeight(1)).toBe(20)
      expect(dynamicRowHeight.getRowHeight(2)).toBe(100)
      expect(dynamicRowHeight.getRowHeight(3)).toBe(25)

      dynamicRowHeight.setRowHeight(1, 25)
      expect(dynamicRowHeight.getRowHeight(1)).toBe(25)
    })

    test('resets when key changes', async () => {
      const key = ref('a')
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
        key,
      })

      dynamicRowHeight.setRowHeight(0, 10)
      expect(dynamicRowHeight.getRowHeight(0)).toBe(10)

      // Key hasn't changed
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(10)

      // Change key
      key.value = 'b'
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(100)
    })
  })

  describe('observeRowElements', () => {
    function createRowElement(index: number) {
      const element = document.createElement('div')

      element.setAttribute(DATA_ATTRIBUTE_LIST_INDEX, '' + index)

      return element
    }

    test('should update cache when an observed element is resized', async () => {
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
      })

      const elementA = createRowElement(0)
      const elementB = createRowElement(1)

      dynamicRowHeight.observeRowElements([elementA, elementB])
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(100)
      expect(dynamicRowHeight.getRowHeight(1)).toBe(100)

      setElementSize({
        element: elementB,
        width: 100,
        height: 20,
      })
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(100)
      expect(dynamicRowHeight.getRowHeight(1)).toBe(20)

      setElementSize({
        element: elementA,
        width: 100,
        height: 15,
      })
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(15)
      expect(dynamicRowHeight.getRowHeight(1)).toBe(20)
    })

    test('should unobserve an element when requested', async () => {
      const dynamicRowHeight = useDynamicRowHeight({
        defaultRowHeight: 100,
      })

      const element = createRowElement(0)

      const unobserve = dynamicRowHeight.observeRowElements([element])

      setElementSize({
        element,
        width: 100,
        height: 10,
      })
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(10)

      unobserve()

      setElementSize({
        element,
        width: 100,
        height: 20,
      })
      await nextTick()
      expect(dynamicRowHeight.getRowHeight(0)).toBe(10)
    })
  })

  // setRowHeight is tested indirectly by "getAverageRowHeight" and "getRowHeight" blocks above
})
