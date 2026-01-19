import {
  computed,
  isRef,
  ref,
  watch,
  type ComputedRef,
  type CSSProperties,
  type Ref,
} from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import type { Align } from '../types'
import { parseNumericStyleValue } from '../utils/parseNumericStyleValue'
import { adjustScrollOffsetForRtl } from '../utils/adjustScrollOffsetForRtl'
import { shallowCompare } from '../utils/shallowCompare'
import { getEstimatedSize as getEstimatedSizeUtil } from './getEstimatedSize'
import { getOffsetForIndex } from './getOffsetForIndex'
import { getStartStopIndices as getStartStopIndicesUtil } from './getStartStopIndices'
import type { Direction, SizeFunction } from './types'
import { useCachedBounds } from './useCachedBounds'
import { useItemSize } from './useItemSize'

export function useVirtualizer<Props extends object>({
  containerElement,
  containerStyle,
  defaultContainerSize = 0,
  direction,
  isRtl = false,
  itemCount: itemCountInput,
  itemProps: itemPropsInput,
  itemSize: itemSizeProp,
  onResize,
  overscanCount,
}: {
  containerElement: Ref<HTMLElement | null>;
  containerStyle?: CSSProperties;
  defaultContainerSize?: number;
  direction: Direction;
  isRtl?: boolean;
  itemCount: number | Ref<number> | ComputedRef<number>;
  itemProps: Props | ComputedRef<Props>;
  itemSize: number | string | SizeFunction<Props> | Ref<number | string | SizeFunction<Props>> | ComputedRef<number | string | SizeFunction<Props>>;
  onResize:
  | ((
    size: { height: number; width: number; },
    prevSize: { height: number; width: number; }
  ) => void)
  | undefined;
  overscanCount: number;
}) {
  const itemCount = computed(() => {
    return isRef(itemCountInput) ? itemCountInput.value : itemCountInput
  })

  const itemProps = computed(() => {
    return isRef(itemPropsInput) ? itemPropsInput.value : itemPropsInput
  })

  const itemSizeNormalized = computed(() => {
    return isRef(itemSizeProp) ? itemSizeProp.value : itemSizeProp
  })

  const styleHeight = computed(() => parseNumericStyleValue(containerStyle?.height))
  const styleWidth = computed(() => parseNumericStyleValue(containerStyle?.width))

  const sizeState = ref<{
    height: number | undefined;
    width: number | undefined;
  }>({
    height: direction === 'vertical' ? defaultContainerSize : undefined,
    width: direction === 'horizontal' ? defaultContainerSize : undefined,
  })

  const observerDisabled = computed(
    () =>
      (direction === 'vertical' && styleHeight.value !== undefined) ||
      (direction === 'horizontal' && styleWidth.value !== undefined),
  )

  useResizeObserver(
    containerElement,
    (entries) => {
      if (observerDisabled.value) return

      for (const entry of entries) {
        const { contentRect } = entry
        const prevState = sizeState.value

        if (
          prevState.height === contentRect.height &&
          prevState.width === contentRect.width
        ) {
          return
        }

        sizeState.value = {
          height: contentRect.height,
          width: contentRect.width,
        }
      }
    },
  )

  const size = computed(() => ({
    height: styleHeight.value ?? sizeState.value.height,
    width: styleWidth.value ?? sizeState.value.width,
  }))

  const prevSize = ref<{ height: number; width: number; }>({
    height: 0,
    width: 0,
  })

  watch(
    size,
    (newSize) => {
      if (typeof onResize === 'function') {
        const prev = prevSize.value
        const height = newSize.height ?? 0
        const width = newSize.width ?? 0

        if (prev.height !== height || prev.width !== width) {
          onResize({ height, width }, { ...prev })

          prevSize.value = { height, width }
        }
      }
    },
    { immediate: true },
  )

  const containerSize = computed(() =>
    direction === 'vertical'
      ? size.value.height ?? defaultContainerSize
      : size.value.width ?? defaultContainerSize,
  )

  const itemSize = computed(() =>
    useItemSize({ containerSize: containerSize.value, itemSize: itemSizeNormalized.value }),
  )

  const cachedBounds = computed(() =>
    useCachedBounds({
      itemCount: itemCount.value,
      itemProps: itemProps.value,
      itemSize: itemSize.value,
    }).value,
  )

  const getCellBounds = (index: number) => cachedBounds.value.get(index)

  const indices = ref<{
    startIndexVisible: number;
    stopIndexVisible: number;
    startIndexOverscan: number;
    stopIndexOverscan: number;
  }>(
    getStartStopIndicesUtil({
      cachedBounds: cachedBounds.value,
      containerScrollOffset: 0,
      containerSize: containerSize.value,
      itemCount: itemCount.value,
      overscanCount,
    }),
  )

  const safeIndices = computed(() => {
    const ind = indices.value

    return {
      startIndexVisible: Math.min(itemCount.value - 1, ind.startIndexVisible),
      startIndexOverscan: Math.min(itemCount.value - 1, ind.startIndexOverscan),
      stopIndexVisible: Math.min(itemCount.value - 1, ind.stopIndexVisible),
      stopIndexOverscan: Math.min(itemCount.value - 1, ind.stopIndexOverscan),
    }
  })

  const getEstimatedSize = computed(() =>
    getEstimatedSizeUtil({
      cachedBounds: cachedBounds.value,
      itemCount: itemCount.value,
      itemSize: itemSize.value,
    }),
  )

  const getStartStopIndices = (scrollOffset: number) => {
    const containerScrollOffset = adjustScrollOffsetForRtl({
      containerElement: containerElement.value,
      direction,
      isRtl,
      scrollOffset,
    })

    return getStartStopIndicesUtil({
      cachedBounds: cachedBounds.value,
      containerScrollOffset,
      containerSize: containerSize.value,
      itemCount: itemCount.value,
      overscanCount,
    })
  }

  watch(
    [containerElement, () => direction, () => cachedBounds.value],
    ([el]) => {
      const scrollOffset =
        (direction === 'vertical' ? el?.scrollTop : el?.scrollLeft) ?? 0

      indices.value = getStartStopIndices(scrollOffset)
    },
    { immediate: true },
  )

  const onScroll = () => {
    const el = containerElement.value

    if (!el) return

    const { scrollLeft, scrollTop } = el

    const scrollOffset = adjustScrollOffsetForRtl({
      containerElement: el,
      direction,
      isRtl,
      scrollOffset: direction === 'vertical' ? scrollTop : scrollLeft,
    })

    const next = getStartStopIndicesUtil({
      cachedBounds: cachedBounds.value,
      containerScrollOffset: scrollOffset,
      containerSize: containerSize.value,
      itemCount: itemCount.value,
      overscanCount,
    })

    if (!shallowCompare(next, indices.value)) {
      indices.value = next
    }
  }

  useEventListener(containerElement, 'scroll', onScroll)

  const scrollToIndex = ({
    align = 'auto',
    containerScrollOffset,
    index,
  }: {
    align?: Align;
    containerScrollOffset: number;
    index: number;
  }) => {
    let scrollOffset = getOffsetForIndex({
      align,
      cachedBounds: cachedBounds.value,
      containerScrollOffset,
      containerSize: containerSize.value,
      index,
      itemCount: itemCount.value,
      itemSize: itemSize.value,
    })

    const el = containerElement.value

    if (el) {
      scrollOffset = adjustScrollOffsetForRtl({
        containerElement: el,
        direction,
        isRtl,
        scrollOffset,
      })

      if (typeof el.scrollTo !== 'function') {
        const next = getStartStopIndices(scrollOffset)

        if (!shallowCompare(indices.value, next)) {
          indices.value = next
        }
      }

      return scrollOffset
    }

    return undefined
  }

  return {
    getCellBounds,
    getEstimatedSize,
    scrollToIndex,
    startIndexOverscan: computed(() => safeIndices.value.startIndexOverscan),
    startIndexVisible: computed(() => safeIndices.value.startIndexVisible),
    stopIndexOverscan: computed(() => safeIndices.value.stopIndexOverscan),
    stopIndexVisible: computed(() => safeIndices.value.stopIndexVisible),
  }
}
