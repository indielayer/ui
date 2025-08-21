import { onUnmounted, unref, nextTick, ref, type Ref, type ComponentPublicInstance } from 'vue'

const focusableQuery = 'button:not([tabindex="-1"]), [href], input, select, textarea, li, a, [tabindex]:not([tabindex="-1"])'

export function useFocusTrap() {
  const focusable = ref<HTMLElement[]>([])
  let observer: MutationObserver | null = null

  let firstFocusableEl: HTMLElement | null = null
  let lastFocusableEl: HTMLElement | null = null
  let prevActiveElement: HTMLElement | null = null
  let currentTarget: HTMLElement | ComponentPublicInstance | null = null

  function getEl(target: HTMLElement | ComponentPublicInstance | null): HTMLElement | null {
    if (!target) return null

    return (target as ComponentPublicInstance).$el
      ? (target as ComponentPublicInstance).$el as HTMLElement
      : target as HTMLElement
  }

  function getFocusableElements(target: HTMLElement | ComponentPublicInstance | null) {
    const el = getEl(target)

    if (!el) return
    const elements = el.querySelectorAll(focusableQuery)

    focusable.value = Array.from(elements) as HTMLElement[]
    firstFocusableEl = focusable.value[0] || null
    lastFocusableEl = focusable.value[focusable.value.length - 1] || null
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || focusable.value.length === 0) return

    const isShiftPressed = event.shiftKey
    const currentEl = document.activeElement as HTMLElement | null

    const firstEl = firstFocusableEl
    const lastEl = lastFocusableEl

    if (!currentEl) {
      event.preventDefault()
      firstEl?.focus()

      return
    }

    if (!isShiftPressed && currentEl === lastEl) {
      event.preventDefault()
      firstEl?.focus()
    } else if (isShiftPressed && currentEl === firstEl) {
      event.preventDefault()
      lastEl?.focus()
    }
  }

  async function initFocusTrap(
    targetRef: Ref<HTMLElement | ComponentPublicInstance | null> | HTMLElement | ComponentPublicInstance | null,
    options?: { initialFocusIndex?: number; returnFocusOnClear?: boolean; },
  ) {
    if (typeof window === 'undefined') return

    // Clean up previous trap if any
    clearFocusTrap()

    prevActiveElement = document.activeElement as HTMLElement

    currentTarget = unref(targetRef)
    if (!currentTarget) return

    await nextTick()
    getFocusableElements(currentTarget)

    // Focus initial element
    const idx = options?.initialFocusIndex ?? 0

    focusable.value[idx]?.focus()

    document.removeEventListener('keydown', handleKeydown)
    observer?.disconnect()

    document.addEventListener('keydown', handleKeydown)

    const el = getEl(currentTarget)

    if (el) {
      observer = new MutationObserver(() => getFocusableElements(currentTarget))
      observer.observe(el, { childList: true, subtree: true })
    }
  }

  function clearFocusTrap(options?: { returnFocus?: boolean; }) {
    document.removeEventListener('keydown', handleKeydown)
    observer?.disconnect()
    observer = null
    if (options?.returnFocus && prevActiveElement) {
      prevActiveElement.focus()
    }
    currentTarget = null
    focusable.value = []
    firstFocusableEl = null
    lastFocusableEl = null
    prevActiveElement = null
  }

  onUnmounted(() => {
    clearFocusTrap({ returnFocus: true })
  })

  return {
    initFocusTrap,
    clearFocusTrap,
    focusable, // expose for advanced use
  }
}
