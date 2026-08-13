import { computed, inject, unref, type ComputedRef, type MaybeRef } from 'vue'
import { injectOptionsKey } from './keys'
import type { ComponentThemes } from '../theme'

export function resolvePropsWithDefaults<P extends object>(
  props: P,
  configured?: Partial<P>,
): P {
  if (!configured) return props

  const resolved = { ...props } as Record<string, unknown>
  const source = props as Record<string, unknown>

  for (const key of Object.keys(configured)) {
    if (source[key] === undefined) {
      resolved[key] = configured[key as keyof P]
    }
  }

  return resolved as P
}

export function useResolvedComponentProps<P extends object>(
  namespace: keyof ComponentThemes,
  props: MaybeRef<P>,
): ComputedRef<P> {
  const options = inject(injectOptionsKey, {})

  return computed(() => resolvePropsWithDefaults(
    unref(props),
    options.defaults?.[namespace] as Partial<P> | undefined,
  ))
}
