import { getCurrentInstance, onBeforeUnmount, ref, watch, type Ref } from 'vue'
import { assert } from '../../utils/assert'
import type { DynamicRowHeight } from './types'

export const DATA_ATTRIBUTE_LIST_INDEX = 'data-virtual-index'

export function useDynamicRowHeight({
  defaultRowHeight,
  key,
}: {
  defaultRowHeight: number;
  key?: Ref<string | number | undefined> | string | number;
}): DynamicRowHeight {
  const map = ref<Map<number, number>>(new Map())
  // Revision counter to trigger reactivity when map changes
  const revision = ref(0)

  // Handle reactive key changes
  if (key !== undefined && typeof key === 'object' && 'value' in key) {
    watch(key as Ref<string | number | undefined>, () => {
      map.value = new Map()
      revision.value++
    })
  }

  const getAverageRowHeight = () => {
    // Access revision to track dependency
    revision.value

    let totalHeight = 0

    map.value.forEach((height) => {
      totalHeight += height
    })

    if (totalHeight === 0) {
      return defaultRowHeight
    }

    return totalHeight / map.value.size
  }

  const getRowHeight = (index: number) => {
    // Access revision to track dependency
    revision.value

    const measuredHeight = map.value.get(index)

    if (measuredHeight !== undefined) {
      return measuredHeight
    }

    // Don't cache default height here - let ResizeObserver do the measuring
    // This prevents stale default heights from blocking updates
    return defaultRowHeight
  }

  const setRowHeight = (index: number, size: number) => {
    if (map.value.get(index) === size) {
      return
    }

    // Create a new Map to trigger reactivity
    const newMap = new Map(map.value)

    newMap.set(index, size)
    map.value = newMap
    revision.value++
  }

  const resizeObserverCallback = (entries: ResizeObserverEntry[]) => {
    if (entries.length === 0) {
      return
    }

    // Batch updates to avoid triggering multiple recalculations
    let hasChanges = false
    const updates: Array<{ index: number; height: number; }> = []

    entries.forEach((entry) => {
      const { borderBoxSize, target } = entry

      const attribute = target.getAttribute(DATA_ATTRIBUTE_LIST_INDEX)

      assert(
        attribute !== null,
        `Invalid ${DATA_ATTRIBUTE_LIST_INDEX} attribute value`,
      )

      const index = parseInt(attribute)

      const { blockSize: height } = borderBoxSize[0]

      if (!height) {
        // Ignore heights that have not yet been measured (e.g. <img> elements that have not yet loaded)
        return
      }

      // Check if height actually changed before updating
      const currentHeight = map.value.get(index)

      if (currentHeight !== height) {
        updates.push({ index, height })
        hasChanges = true
      }
    })

    // Apply all updates at once
    if (hasChanges) {
      const newMap = new Map(map.value)

      updates.forEach(({ index, height }) => {
        newMap.set(index, height)
      })
      map.value = newMap
      revision.value++
    }
  }

  const resizeObserver = new ResizeObserver(resizeObserverCallback)

  onBeforeUnmount(cleanup)

  function cleanup() {
    resizeObserver.disconnect()
  }

  const observeRowElements = (elements: Element[] | NodeListOf<Element>) => {
    const elementsArray = Array.isArray(elements)
      ? elements
      : Array.from(elements)

    elementsArray.forEach((element) => resizeObserver.observe(element))

    return () => {
      elementsArray.forEach((element) => resizeObserver.unobserve(element))
    }
  }

  return {
    getAverageRowHeight,
    getRowHeight,
    setRowHeight,
    observeRowElements,
    cleanup,
  }
}
