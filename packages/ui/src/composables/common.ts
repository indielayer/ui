import type { PropType } from 'vue'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined

export const useCommon = () => {}

const validators = Object.freeze({
  size: ['xs', 'sm', 'md', 'lg', 'xl'],
})

useCommon.props = () => ({
  size: {
    type: String as PropType<Size>,
    validator: (value: string) => validators.size.includes(value),
  },
} as const)

useCommon.validators = () => ({
  ...validators,
})
