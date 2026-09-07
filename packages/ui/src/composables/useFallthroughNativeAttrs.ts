import { computed, useAttrs, type ComputedRef } from 'vue'

const WRAPPER_ATTR_KEYS = new Set(['hidden', 'inert'])

function isEventListener(key: string) {
  return key.startsWith('on') && key.length > 2 && key[2] === key[2].toUpperCase()
}

export type FallthroughNativeAttrs = {
  wrapperAttrs: Record<string, unknown>;
  wrapperClass: unknown;
  wrapperStyle: unknown;
  nativeAttrs: Record<string, unknown>;
}

export function splitFallthroughNativeAttrs(attrs: Record<string, unknown>): FallthroughNativeAttrs {
  const wrapperAttrs: Record<string, unknown> = {}
  const nativeAttrs: Record<string, unknown> = {}
  let wrapperClass: unknown
  let wrapperStyle: unknown

  for (const key of Object.keys(attrs)) {
    if (key === 'class') {
      wrapperClass = attrs[key]
    } else if (key === 'style') {
      wrapperStyle = attrs[key]
    } else if (WRAPPER_ATTR_KEYS.has(key) || isEventListener(key)) {
      wrapperAttrs[key] = attrs[key]
    } else {
      nativeAttrs[key] = attrs[key]
    }
  }

  return { wrapperAttrs, wrapperClass, wrapperStyle, nativeAttrs }
}

export function useFallthroughNativeAttrs(): ComputedRef<FallthroughNativeAttrs> {
  const attrs = useAttrs()

  return computed(() => splitFallthroughNativeAttrs(attrs as Record<string, unknown>))
}
