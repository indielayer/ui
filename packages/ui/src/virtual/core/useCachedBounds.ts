import { computed, type ComputedRef } from 'vue'
import { createCachedBounds } from './createCachedBounds'
import type { CachedBounds, SizeFunction } from './types'

export function useCachedBounds<Props extends object>({
  itemCount,
  itemProps,
  itemSize,
}: {
  itemCount: number;
  itemProps: Props;
  itemSize: number | SizeFunction<Props>;
}): ComputedRef<CachedBounds> {
  return computed(() =>
    createCachedBounds({
      itemCount,
      itemProps,
      itemSize,
    }),
  )
}
