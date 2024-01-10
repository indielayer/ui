import type { LoaderStatus } from 'src/components/loader/Loader.vue'
import type { PropType, Ref } from 'vue'

export interface InteractiveProps {
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  loadingStatus?: LoaderStatus;
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
  loadingLabel: String,
  loadingStatus: {
    type: String as PropType<LoaderStatus>,
    default: 'active',
  },
} as const)
