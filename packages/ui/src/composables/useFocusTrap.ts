import type { ComponentPublicInstance } from 'vue'
import { onUnmounted, type MaybeRef, unref, nextTick } from 'vue'

const focusableQuery = 'button:not([tabindex="-1"]), [href], input, select, textarea, li, a, [tabindex]:not([tabindex="-1"])'

export function useFocusTrap() {
  let focusable: HTMLElement[] = []
  let observer: MutationObserver | null = null

  let firstFocusableEl: HTMLElement | null = null
  let lastFocusableEl: HTMLElement | null = null

  async function initFocusTrap(targetRef: MaybeRef<HTMLElement | ComponentPublicInstance | null>) {
    targetRef = unref(targetRef)

    if (!targetRef) return

    await nextTick()

    getFocusableElements(targetRef)

    if (firstFocusableEl) firstFocusableEl.focus()

    document.addEventListener('keydown', handleKeydown)
    observer = new MutationObserver(() => getFocusableElements(targetRef))

    if ((targetRef as ComponentPublicInstance).$el) observer.observe((targetRef as ComponentPublicInstance).$el as Node, { childList: true, subtree: true })
    else observer.observe(targetRef as Node, { childList: true, subtree: true })
  }

  function getFocusableElements(targetRef: MaybeRef<HTMLElement | ComponentPublicInstance | null>) {
    if (targetRef === null) return

    let elements

    if ((targetRef as ComponentPublicInstance).$el) elements = (targetRef as ComponentPublicInstance)?.$el.querySelectorAll(focusableQuery)
    else (targetRef as HTMLElement).querySelectorAll(focusableQuery)

    focusable = Array.from(elements || []) as HTMLElement[]
    firstFocusableEl = focusable[0] || null
    lastFocusableEl = focusable[focusable.length - 1] || null
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const isShiftPressed = event.shiftKey
      const currentEl = document.activeElement as HTMLElement | null

      if (!currentEl) {
        event.preventDefault()
        focusable[0]?.focus()

        return
      }

      const firstEl = focusable[0]
      const lastEl = focusable[focusable.length - 1]

      if (!isShiftPressed && currentEl === lastEl) {
        event.preventDefault()
        firstEl?.focus()
      } else if (isShiftPressed && currentEl === firstEl) {
        event.preventDefault()
        lastEl?.focus()
      }

    }
  }

  const clearFocusTrap = () => {
    document.removeEventListener('keydown', handleKeydown)
    observer?.disconnect()
  }

  onUnmounted(() => {
    clearFocusTrap()
  })

  return {
    initFocusTrap,
    clearFocusTrap,
  }
}
