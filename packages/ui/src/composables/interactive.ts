import type { Ref } from 'vue'

export const useInteractive = (
  el: Ref<HTMLElement | undefined>,
) => {
  return {
    focus: () => {
      el.value?.focus?.()
    },
  }
}

useInteractive.props = () => ({
  disabled: Boolean,
  loading: Boolean,
} as const)
