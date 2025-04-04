/**
 * @file useVirtualList composable adapted from https://github.com/vueuse/vueuse/blob/main/packages/core/useVirtualList/index.ts
 */
import { computed, ref, shallowRef, unref, watch } from 'vue'
import type { Ref, ShallowRef, StyleValue } from 'vue'
import type { MaybeRef } from '@vueuse/shared'
import { useElementSize } from '@vueuse/core'

type UseVirtualListItemSize = number | ((index: number) => number)

export type UseVirtualListOptions = {
  /**
   * item height, accept a pixel value or a function that returns the height
   *
   * @default 0
   */
  disabled?: boolean;
  itemHeight: UseVirtualListItemSize;
  topOffset: number;
  bottomOffset: number;
  /**
   * the extra buffer items outside of the view area
   *
   * @default 5
   */
  overscan?: number;
}

export interface UseVirtualListItem<T> {
  data: T;
  index: number;
}

export interface UseVirtualListReturn<T> {
  list: Ref<UseVirtualListItem<T>[]>;
  scrollTo: (index: number) => void;
  reset: () => void;

  containerProps: {
    ref: Ref<HTMLElement | null>;
    style: StyleValue;
    onScroll: () => void;
  };
  wrapperProps: MaybeRef<{
    style?: {
      width: string;
      height: string;
      marginTop: string;
    } | {
      width: string;
      height: string;
      marginLeft: string;
      display: string;
    };
  }>;
}

export function useVirtualList<T = any>(list: MaybeRef<T[]>, options: UseVirtualListOptions): UseVirtualListReturn<T> {
  if (options.disabled) {
    return {
      list: computed(() => unref(list).map((data, index) => ({ data, index }))),
      scrollTo: () => {},
      reset: () => {},
      containerProps: {
        ref: ref(null),
        style: {},
        onScroll: () => {},
      },
      wrapperProps: {},
    }
  }

  const { containerStyle, wrapperProps, scrollTo, calculateRange, currentList, containerRef } = useVerticalVirtualList(options, list)

  return {
    list: currentList,
    scrollTo,
    reset: calculateRange,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange()
      },
      style: containerStyle,
    },
    wrapperProps,
  }
}

type UseVirtualListContainerRef = Ref<HTMLElement | null>

interface UseVirtualElementSizes {
  width: Ref<number>;
  height: Ref<number>;
}

type UseVirtualListArray<T> = UseVirtualListItem<T>[]
type UseVirtualListRefArray<T> = Ref<UseVirtualListArray<T>>

type UseVirtualListSource<T> = Ref<T[]> | ShallowRef<T[]>

interface UseVirtualListState { start: number; end: number; }

type RefState = Ref<UseVirtualListState>

interface UseVirtualListResources<T> {
  state: RefState;
  source: UseVirtualListSource<T>;
  currentList: UseVirtualListRefArray<T>;
  size: UseVirtualElementSizes;
  containerRef: UseVirtualListContainerRef;
}

function useVirtualListResources<T>(list: MaybeRef<T[]>): UseVirtualListResources<T> {
  const containerRef = ref<HTMLElement | null>(null)
  const size = useElementSize(containerRef)

  const currentList: Ref<UseVirtualListItem<T>[]> = ref([])
  const source = shallowRef(list)

  const state: Ref<{ start: number; end: number; }> = ref({ start: 0, end: 10 })

  return { state, source, currentList, size, containerRef }
}

function createGetViewCapacity<T>(state: UseVirtualListResources<T>['state'], source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
  return (containerSize: number) => {
    if (typeof itemSize === 'number')
      return Math.ceil(containerSize / itemSize)

    const { start = 0 } = state.value
    let sum = 0
    let capacity = 0

    for (let i = start; i < source.value.length; i++) {
      const size = itemSize(i)

      sum += size
      capacity = i
      if (sum > containerSize)
        break
    }

    return capacity - start
  }
}

function createGetOffset<T>(source: UseVirtualListResources<T>['source'], itemSize: UseVirtualListItemSize) {
  return (scrollDirection: number) => {
    if (typeof itemSize === 'number')
      return Math.floor(scrollDirection / itemSize) + 1

    let sum = 0
    let offset = 0

    for (let i = 0; i < source.value.length; i++) {
      const size = itemSize(i)

      sum += size
      if (sum >= scrollDirection) {
        offset = i
        break
      }
    }

    return offset + 1
  }
}

function createCalculateRange<T>(type: 'horizontal' | 'vertical', overscan: number, getOffset: ReturnType<typeof createGetOffset>, getViewCapacity: ReturnType<typeof createGetViewCapacity>, { containerRef, state, currentList, source }: UseVirtualListResources<T>) {
  return () => {
    const element = containerRef.value

    if (element) {
      const offset = getOffset(type === 'vertical' ? element.scrollTop : element.scrollLeft)
      const viewCapacity = getViewCapacity(type === 'vertical' ? element.clientHeight : element.clientWidth)

      const from = offset - overscan
      const to = offset + viewCapacity + overscan

      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length
          ? source.value.length
          : to,
      }
      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((ele, index) => ({
          data: ele,
          index: index + state.value.start,
        }))
    }
  }
}

function createGetDistance<T>(itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
  return (index: number) => {

    if (typeof itemSize === 'number') {
      const size = index * itemSize

      return size
    }

    const size = source.value
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemSize(i), 0)

    return size
  }
}

function useWatchForSizes<T>(size: UseVirtualElementSizes, list: MaybeRef<T[]>, containerRef: Ref<HTMLElement | null>, calculateRange: () => void) {
  watch([size.width, size.height, list, containerRef], () => {
    calculateRange()
  })
}

function createComputedTotalSize<T>(itemSize: UseVirtualListItemSize, source: UseVirtualListResources<T>['source']) {
  return computed(() => {
    if (typeof itemSize === 'number')
      return source.value.length * itemSize

    return source.value.reduce((sum, _, index) => sum + itemSize(index), 0)
  })
}

const scrollToDictionaryForElementScrollKey = {
  horizontal: 'scrollLeft',
  vertical: 'scrollTop',
} as const

function createScrollTo<T>(type: 'horizontal' | 'vertical', calculateRange: () => void, getDistance: ReturnType<typeof createGetDistance>, containerRef: UseVirtualListResources<T>['containerRef']) {
  return (index: number) => {
    if (containerRef.value) {
      containerRef.value[scrollToDictionaryForElementScrollKey[type]] = getDistance(index)
      calculateRange()
    }
  }
}

function useVerticalVirtualList<T>(options: UseVirtualListOptions, list: MaybeRef<T[]>) {
  const resources = useVirtualListResources(list)

  const { state, source, currentList, size, containerRef } = resources

  const containerStyle: StyleValue = { overflowY: 'auto' }

  const { itemHeight, topOffset = 0, bottomOffset = 0, overscan = 5 } = options

  const getViewCapacity = createGetViewCapacity(state, source, itemHeight)

  const getOffset = createGetOffset(source, itemHeight)

  const calculateRange = createCalculateRange('vertical', overscan, getOffset, getViewCapacity, resources)

  const getDistanceTop = createGetDistance(itemHeight, source)

  const offsetTop = computed(() => getDistanceTop(state.value.start))

  const totalHeight = createComputedTotalSize(itemHeight, source)

  const scrollTo = createScrollTo('vertical', calculateRange, getDistanceTop, containerRef)

  useWatchForSizes(size, source, containerRef, calculateRange)

  const wrapperProps = computed(() => {
    const total = totalHeight.value + topOffset + bottomOffset
    const offTop = offsetTop.value > total ? total : offsetTop.value

    return {
      style: {
        width: '100%',
        height: `${totalHeight.value - offTop + topOffset + bottomOffset}px`,
        marginTop: `${offTop}px`,
      },
    }
  })

  return {
    calculateRange,
    scrollTo,
    containerStyle,
    wrapperProps,
    currentList,
    containerRef,
  }
}
