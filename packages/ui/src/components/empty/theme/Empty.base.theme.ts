import type { EmptyTheme } from '../Empty.vue'

function paddingForSize(size: string | undefined) {
  if (size === 'xs' || size === 'sm') return 'p-4'
  if (size === 'lg') return 'p-10'
  if (size === 'xl') return 'p-12'

  return 'p-8'
}

function titleClasses(size: string | undefined) {
  if (size === 'xs') return 'text-xs font-medium text-secondary-700 dark:text-secondary-200'
  if (size === 'sm') return 'text-sm font-medium text-secondary-700 dark:text-secondary-200'
  if (size === 'lg') return 'text-lg font-semibold text-secondary-800 dark:text-secondary-100'
  if (size === 'xl') return 'text-xl font-semibold text-secondary-800 dark:text-secondary-100'

  return 'text-base font-medium text-secondary-700 dark:text-secondary-200'
}

function descriptionClasses(size: string | undefined) {
  if (size === 'xs') return 'text-xs text-secondary-500 dark:text-secondary-400 max-w-xs'
  if (size === 'sm') return 'text-sm text-secondary-500 dark:text-secondary-400 max-w-sm'
  if (size === 'lg') return 'text-base text-secondary-500 dark:text-secondary-400 max-w-md'
  if (size === 'xl') return 'text-lg text-secondary-500 dark:text-secondary-400 max-w-lg'

  return 'text-sm text-secondary-500 dark:text-secondary-400 max-w-sm'
}

const theme: EmptyTheme = {
  classes: {
    wrapper: ({ props }) => `flex flex-col items-center justify-center text-center gap-2 ${paddingForSize(props.size)}`,
    bordered: 'border border-dashed border-secondary-300 dark:border-secondary-600 rounded-lg w-full',
    icon: 'text-secondary-400 dark:text-secondary-500 shrink-0',
    title: ({ props }) => titleClasses(props.size),
    description: ({ props }) => descriptionClasses(props.size),
    actions: 'flex flex-wrap items-center justify-center gap-2 mt-2',
  },
}

export default theme
