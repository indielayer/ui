import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: 'fixed z-40 inset-0 overflow-y-auto transition-all',

    backdrop: 'fixed inset-0 bg-gray-500 dark:bg-black transition-opacity',

    modal: ({ props }: ThemeParams) => {
      let c = 'relative flex flex-col z-10 bg-white dark:bg-gray-900 rounded-md shadow-lg transform transition-all overflow-hidden max-h-full w-full'

      if (props.size === 'xs') c += ' sm:max-w-xs'
      else if (props.size === 'sm') c += ' sm:max-w-sm'
      else if (props.size === 'lg') c += ' sm:max-w-xl'
      else if (props.size === 'xl') c += ' sm:max-w-3xl'
      else c += ' sm:max-w-lg'

      return c
    },

    closeIcon: 'flex absolute p-1 top-4 z-10 right-4 rounded-full bg-opacity-10 hover:bg-opacity-30 cursor-pointer',

    header: 'text-lg font-semibold px-6 py-4 border-b',

    content: 'px-6 py-4',

    actions: 'bg-slate-50 dark:bg-gray-800 p-4',
  },
}
