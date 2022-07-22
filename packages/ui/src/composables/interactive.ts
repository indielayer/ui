import type { Ref } from 'vue'

export interface InteractiveProps {
  disabled?: boolean
  loading?: boolean
}

export const useInteractive = (
  el: Ref<HTMLElement | null>,
) => {
  return {
    focus: () => el.value?.focus?.(),
    blur: () => el.value?.blur?.(),
  }
}

useInteractive.props = () => ({
  disabled: Boolean,
  loading: Boolean,
} as const)
