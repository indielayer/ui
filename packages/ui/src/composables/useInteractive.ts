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
  disabled: {
    type: Boolean,
    description: 'Disables interaction and applies disabled styling.',
  },
  loading: {
    type: Boolean,
    description: 'Shows a loading indicator and blocks interaction.',
  },
  loadingLabel: {
    type: String,
    description: 'Accessible label announced while loading.',
  },
  loadingStatus: {
    type: String as PropType<LoaderStatus>,
    default: 'active',
    description: 'Loader visual status (for example active or indeterminate).',
  },
} as const)
