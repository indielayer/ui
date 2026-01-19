import { ref, watch, type Ref } from 'vue'
import { isRtl } from '../utils/isRtl'

export function useIsRtl(
  element: Ref<HTMLElement | null>,
  dir?: 'ltr' | 'rtl' | 'auto',
) {
  const value = ref(dir === 'rtl')

  watch(
    [element, () => dir],
    ([el, direction]) => {
      if (el) {
        if (!direction || direction === 'auto') {
          value.value = isRtl(el)
        } else {
          value.value = direction === 'rtl'
        }
      }
    },
    { immediate: true },
  )

  return value
}
