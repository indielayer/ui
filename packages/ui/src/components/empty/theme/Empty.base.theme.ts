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

  return 'text-base font-medium text-secondary-800 dark:text-secondary-200'
}

function descriptionClasses(size: string | undefined) {
  if (size === 'xs') return 'text-xs text-secondary-500 dark:text-secondary-400 max-w-xs'
  if (size === 'sm') return 'text-sm text-secondary-500 dark:text-secondary-400 max-w-sm'
  if (size === 'lg') return 'text-base text-secondary-500 dark:text-secondary-400 max-w-md'
  if (size === 'xl') return 'text-lg text-secondary-500 dark:text-secondary-400 max-w-lg'

  return 'text-sm text-secondary-500 dark:text-secondary-400 max-w-md'
}

function iconWrapClasses(size: string | undefined) {
  const base = 'flex items-center justify-center shrink-0 border border-secondary-300 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800/80'

  if (size === 'xs') return `${base} size-8 rounded-lg`
  if (size === 'sm') return `${base} size-9 rounded-xl`
  if (size === 'lg') return `${base} size-12 rounded-2xl`
  if (size === 'xl') return `${base} size-14 rounded-2xl`

  return `${base} size-11 rounded-xl`
}

const theme: EmptyTheme = {
  classes: {
    wrapper: ({ props }) => `flex flex-col items-center justify-center text-center gap-3 ${paddingForSize(props.size)}`,
    bordered: 'border border-dashed border-secondary-300 dark:border-secondary-600 rounded-lg w-full',
    iconWrap: ({ props }) => iconWrapClasses(props.size),
    icon: 'text-secondary-500 dark:text-secondary-400 shrink-0',
    title: ({ props }) => titleClasses(props.size),
    description: ({ props }) => descriptionClasses(props.size),
    actions: 'flex flex-wrap items-center justify-center gap-2 mt-1',
  },
}

export default theme
